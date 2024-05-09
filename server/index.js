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


// Define a POST route to receive the location
app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(`Received location: Latitude ${latitude}, Longitude ${longitude}`);
  // Optionally, you could do something with the location data, like store it in the database
  res.status(200).json({ message: 'Location received successfully' });
});


function haversineDistance(coords1, coords2) {
  function toRad(x) {
      return x * Math.PI / 180;
  }

  var lon1 = parseFloat(coords1[1]);
  var lat1 = parseFloat(coords1[0]);
  var lon2 = parseFloat(coords2[1]);
  var lat2 = parseFloat(coords2[0]);

  if (isNaN(lon1) || isNaN(lat1) || isNaN(lon2) || isNaN(lat2)) {
      console.log('Invalid coordinate input');
      return NaN;
  }

  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
}

app.get('/bees-nearby', (req, res) => {
  // const { userLatitude, userLongitude } = req.body;
  const userLatitude = 27.6076757;
  const userLongitude = 85.5309571;
  // console.log(userLatitude)
  if (isNaN(userLatitude) || isNaN(userLongitude)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
  }

  db.all('SELECT Name, Latitude, Longitude FROM Bees', (err, rows) => {
      if (err) {
          console.error('Database error:', err.message);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }

      const beesNearby = rows.filter(row => {
          const distance = haversineDistance([userLatitude, userLongitude], [row.Latitude, row.Longitude]);
          console.log(`Distance to ${row.Name}: ${distance} km`);
          return distance <= 5; // distance in km
      }).map(row => row.Name);

      if (beesNearby.length === 0) {
          res.status(404).json({ message: 'No bees found within 5 km' });
      } else {
          res.json(beesNearby);
      }
  });
});



// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
