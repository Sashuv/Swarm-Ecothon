const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// Create a new Express application
const app = express();

// Use CORS middleware
app.use(cors());

// Configure Express to parse JSON
app.use(express.json());

// Initialize the SQLite database
const db = new sqlite3.Database('./bess.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Define a route
app.get('/data', (req, res) => {
    db.all('SELECT * FROM Bees', (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(rows);
    });
  });

// Define a POST route
app.post('/data', (req, res) => {
  const { name, Longitude, Latitude, imageUrl, caption, username } = req.body;

  const sql = `INSERT INTO Bees (Name, Longitude, Latitude, ImageUrl, Caption, Username) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [name, Longitude, Latitude, imageUrl, caption, username];
  db.run(sql, params, function(err) {
      if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Failed to insert data into the database' });
          return;
      }
      res.status(201).json({ message: 'Data inserted successfully', id: this.lastID });
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
