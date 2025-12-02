// Load environment variables from .env file
require('dotenv').config();

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const db = require('./queries')
const path = require('path')

// Middleware
// host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes
app.get('/', (req, res) => {
    // in a bit
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Crud
// Create a new song
app.post('/music', db.createMusic)
// Read all songs
app.get('/music', db.getMusic)
// Update a song
app.put('/music/:id', db.updateMusic)
// Delete a song
app.delete('/music/:id', db.deleteMusic)


// Starting Express on our Port
if (require.main === module) {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  }
  
module.exports = app;