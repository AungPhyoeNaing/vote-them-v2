import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
// Trust proxy is required if behind Nginx (like on aaPanel) to get real IPs
app.set('trust proxy', true);

// Database Setup
const dbPath = join(__dirname, 'votes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    db.serialize(() => {
      // PERFORMANCE OPTIMIZATION
      db.run('PRAGMA journal_mode = WAL');
      db.run('PRAGMA synchronous = NORMAL');
      
    // Create table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidateId TEXT NOT NULL,
      categoryId TEXT NOT NULL,
      ipAddress TEXT,
      fingerprint TEXT,
      voterId TEXT,
      hardwareId TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // INDEXING
    db.run(`CREATE INDEX IF NOT EXISTS idx_candidate ON votes(candidateId)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_ip_category ON votes(ipAddress, categoryId)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_fingerprint_category ON votes(fingerprint, categoryId)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_voterid_category ON votes(voterId, categoryId)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_hardware_ip ON votes(hardwareId, ipAddress)`);

      console.log('Database initialized successfully.');
      
      // Start server only after DB is ready
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    });
  }
});

// --- Simple Rate Limiter ---
const rateLimit = (limit, windowMs) => {
  const requests = new Map();
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }
    
    const timestamps = requests.get(ip).filter(time => now - time < windowMs);
    if (timestamps.length >= limit) {
      return res.status(429).json({ error: 'Too many requests. Please slow down.' });
    }
    
    timestamps.push(now);
    requests.set(ip, timestamps);
    next();
  };
};

// --- API Endpoints ---

// 1. Get Stats
app.get('/api/stats', (req, res) => {
  const sql = `SELECT candidateId, COUNT(*) as count FROM votes GROUP BY candidateId`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    const voteState = {};
    rows.forEach((row) => {
      voteState[row.candidateId] = row.count;
    });
    
    res.json(voteState);
  });
});

// 2. Cast Vote
app.post('/api/vote', rateLimit(100, 60 * 1000), (req, res) => {
  const { candidateId, categoryId, fingerprint, voterId, hardwareId } = req.body;
  const ip = req.ip || req.connection.remoteAddress;

  if (!candidateId || !categoryId || !fingerprint || !voterId || !hardwareId) {
    return res.status(400).json({ error: 'Missing voting data' });
  }

  // 1. TRIPLE-CHECK LOGIC + HARDWARE BINDING
  const checkSql = `SELECT voterId, fingerprint, ipAddress, hardwareId FROM votes WHERE categoryId = ? AND (voterId = ? OR ipAddress = ?)`;
  
  db.all(checkSql, [categoryId, voterId, ip], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB Error' });

    // A. Absolute Block: Persistent Voter ID match
    if (rows.some(r => r.voterId === voterId)) {
      return res.status(403).json({ error: 'You have already voted in this category.' });
    }

    // B. ANTI-SWITCHER LOGIC:
    // If the IP matches, we check the Hardware ID. 
    // If someone switches browsers on the same phone, the IP AND the Hardware will match.
    const sameHardwareSameIP = rows.find(r => r.ipAddress === ip && r.hardwareId === hardwareId);
    if (sameHardwareSameIP) {
      return res.status(403).json({ error: 'This device has already voted (Browser switching detected).' });
    }

    // C. Network Limit: Allow max 3 DIFFERENT devices per IP (for hotspots)
    const ipVotes = rows.filter(r => r.ipAddress === ip).length;
    if (ipVotes >= 3) {
      return res.status(403).json({ error: 'Network limit reached (Max 3 friends per hotspot).' });
    }

    // 2. All checks passed - Insert Vote
    const insertSql = `INSERT INTO votes (candidateId, categoryId, ipAddress, fingerprint, voterId, hardwareId) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(insertSql, [candidateId, categoryId, ip, fingerprint, voterId, hardwareId], function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to record vote' });
      }
      res.json({ success: true, id: this.lastID });
    });
  });
});

// 3. Reset Database (Admin)
app.post('/api/reset', (req, res) => {
  const { pin } = req.body;
  if (pin !== '2025') {
    return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
  }

  db.serialize(() => {
    db.run(`DELETE FROM votes`, [], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to reset database' });
      }
      db.run('VACUUM', (err) => {
         if(err) console.error("Vacuum error:", err);
         res.json({ success: true });
      });
    });
  });
});
