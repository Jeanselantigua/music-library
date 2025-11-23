// Load environment variables from .env file
require('dotenv').config();

const express = require('express');

const app = express();
const port = 3000;

const db = require('./queries')
const path = require('path')

// Middleware
// host react app as static files
app.use(express.static(path.resolve(__dirname, '../favlinks/build')))



// Routes
app.get('/', (req, res) => {
    // in a bit
    res.sendFile(path.resolve(__dirname, '../favlinks/build', 'index.html'));
});

// Crud
// Create a new song

// Read all songs
app.get('/music', db.getMusic)

// Update a song

// Delete a song

// Starting Express on our Port
app.listen(3000, () => {
    console.log(`Server is running on port ${port}.`);
});