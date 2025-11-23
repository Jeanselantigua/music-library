// Connect to Postgres using the node-postgres package

const POOL = require('pg').Pool;

const pool = new POOL({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


// Create all the functions that will be our request handlers in our express server

// Create new link in the DB



// Read all data from DB

const getMusic = (req, res) => {
    pool.query('SELECT * FROM music ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

// Update link in the DB


// Delete link in the DB


module.exports = {
    getMusic
}