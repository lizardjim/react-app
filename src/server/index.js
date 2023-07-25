require('dotenv').config({ path: './w3s-dynamic-storage/.env' })
const path = require('path');
const express = require('express')
const test = require('./test.js')
const yext = require('./yext.js')

const { static, json } = express;
const { resolve } = path;
const app = express();

app.use(static('dist'));
app.use(json());

app.get('/api/hello', async (req, res) => {
  res.send('Hello world');
});

const clientApp = express();
clientApp.use(static('dist'));
clientApp.use(json());

clientApp.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../../dist', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}!`));

if (process.env.NODE_ENV !== 'development') {
  clientApp.listen(8000, () => console.log('client listening on port 8000'));

}

//database connection
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('w3s-dynamic-storage/database.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
    createTable();
  }
});

//create table if not exist
function createTable() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS Locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Country TEXT,
        Region TEXT,
        PlantId INTEGER,
        PlantName TEXT,
        PlantPostCode INTEGER,
        PlantAddressLine1 TEXT,
        PlantTown TEXT,
        PlantCountry TEXT,
        PlantManagerName TEXT,
        PlantManagerPhone TEXT,
        PlantManagerEmail TEXT
      )
    `);
  });
}

//to insert data into location table
app.post('/api/data', (req, res) => {
 // Extract form data from req.body
  const { countryData, plantData, regionData, plantName, plantPostcode, plantAddress, plantTown, plantCountry, plantManagerName, plantManagerPhone, plantManagerEmail } = req.body;
  // Insert the form data into the SQLite database
  const query = `INSERT INTO Locations 
                (Country, Region, PlantId, PlantName, PlantPostCode, PlantAddressLine1, PlantTown, PlantCountry, PlantManagerName, PlantManagerPhone, PlantManagerEmail) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [countryData, regionData, plantData, plantName, plantPostcode, plantAddress, plantTown, plantCountry, plantManagerName, plantManagerPhone, plantManagerEmail];

  db.run(query, values, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send('Error storing form data');
    } else {
      res.status(200).json({ message: "Added", status: 200 });
      test.addArticle(values);
      yext.addLocation(values);

    }
  });

})


//get all data of location
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM Locations';

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.status(200).json(rows);
    }
  });
});

//get location data based on primary data
app.get('/api/get-primary-data', (req, res) => {
  const { countryData, regionData, plantData } = req.query
  const query = `SELECT * FROM Locations WHERE Country = ? AND Region = ? AND PlantId = ?`;
  const values = [countryData, regionData, plantData]
  db.all(query, values, function (err, rows) {
    if (err) {
      res.status(500).send('Error retriving data');
    } else {
      res.status(200).json(rows)
    }
  });
})

//to update location data
app.patch('/api/data-edit/:id', (req, res) => {
  const { id } = req.params;
  const updateFieldsObj = {
    Country:req.body.country,
    Region:req.body.region,
    PlantId:req.body.plantId,
    PlantName:req.body.plantName,
    PlantPostCode:req.body.plantPostcode,
    PlantAddressLine1:req.body.plantAddress,
    PlantTown:req.body.plantTown,
    PlantCountry:req.body.plantCountry,
    PlantManagerName:req.body.plantManagerName,
    PlantManagerPhone:req.body.plantManagerPhone,
    PlantManagerEmail:req.body.plantManagerEmail,
  }
  // Construct the update query dynamically
  let query = 'UPDATE Locations SET ';
  let values = [];

  // Build the query and values array based on the updatedFields object
  Object.keys(updateFieldsObj).forEach((field, index) => {
    query += `${field.charAt(0).toUpperCase() + field.slice(1)} = ?, `;
    values.push(updateFieldsObj[field]);
  });
  query = query.slice(0, -2);

  // Add the WHERE clause to specify the record to update
  query += ' WHERE id = ?';
  values.push(id);

  db.run(query, values, function (err) {
    if (err) {
      res.status(500).send('Error updating form data');
    } else {
      res.status(200).json({ message: 'Updated', status: 200 });
      test.updateArticle(req.body.previousPlantName,updateFieldsObj)
    }
  });
});

//to delete records form locations
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const { plantNames,countryName } = req.body;
  const query = 'DELETE FROM Locations WHERE id = ?';
  db.run(query, id, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting record');
    } else {
      res.status(200).json({ message: 'Record deleted successfully', status: 200 });
      test.deleteArticle(plantNames,countryName);
    }
  });
});

// Close the database connection when the component unmounts
return () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Disconnected from SQLite database');
    }
  });
};