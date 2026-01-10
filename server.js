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

// Database Setup
const dbPath = join(__dirname, 'votes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidateId TEXT NOT NULL,
      categoryId TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// --- API Endpoints ---

// 1. Get Stats (Vote Counts)
app.get('/api/stats', (req, res) => {
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

  if (!candidateId || !categoryId) {
    return res.status(400).json({ error: 'Missing candidateId or categoryId' });
  }

  const sql = `INSERT INTO votes (candidateId, categoryId) VALUES (?, ?)`;
  
  db.run(sql, [candidateId, categoryId], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to record vote' });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// 3. Reset Database (Admin)
app.post('/api/reset', (req, res) => {
  db.run(`DELETE FROM votes`, [], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to reset database' });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/stats`);
});