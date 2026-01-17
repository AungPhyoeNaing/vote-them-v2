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
    
    // PERFORMANCE OPTIMIZATION: Enable Write-Ahead Logging (WAL)
    // This allows simultaneous readers and writers, preventing "Database Locked" errors
    // during high-traffic voting.
    db.run('PRAGMA journal_mode = WAL');
    db.run('PRAGMA synchronous = NORMAL'); // Faster writes with reasonable safety
    
    // Create table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidateId TEXT NOT NULL,
      categoryId TEXT NOT NULL,
      ipAddress TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // INDEXING: Speeds up the COUNT(*) queries significantly
    db.run(`CREATE INDEX IF NOT EXISTS idx_candidate ON votes(candidateId)`);
  }
});

// --- API Endpoints ---

// 1. Get Stats (Vote Counts)
app.get('/api/stats', (req, res) => {
  // Using the index we created for fast counting
  const sql = `SELECT candidateId, COUNT(*) as count FROM votes GROUP BY candidateId`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Transform array to object: { "k1": 10, "q2": 5 }
    const voteState = {};
    rows.forEach((row) => {
      voteState[row.candidateId] = row.count;
    });
    
    res.json(voteState);
  });
});

// 2. Cast Vote
app.post('/api/vote', (req, res) => {
  const { candidateId, categoryId } = req.body;
  const ip = req.ip || req.connection.remoteAddress; // Log IP for audit

  if (!candidateId || !categoryId) {
    return res.status(400).json({ error: 'Missing candidateId or categoryId' });
  }

  const sql = `INSERT INTO votes (candidateId, categoryId, ipAddress) VALUES (?, ?, ?)`;
  
  db.run(sql, [candidateId, categoryId, ip], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to record vote' });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// 3. Reset Database (Admin)
app.post('/api/reset', (req, res) => {
  // Execute within a transaction for safety
  db.serialize(() => {
    db.run(`DELETE FROM votes`, [], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to reset database' });
      }
      // Vacuum cleans up the unused space in the file
      db.run('VACUUM', (err) => {
         if(err) console.error("Vacuum error:", err);
         res.json({ success: true });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/stats`);
});