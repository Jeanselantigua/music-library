// Connect to Postgres using the node-postgres package

// Connect to Postgres using the node-postgres package
const { Pool } = require('pg');

// In production (Heroku), use DATABASE_URL + SSL
const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});


// Create all the functions that will be our request handlers in our express server

// Create new song
const createMusic = (req, res) => {
    const { song_name, arranged_by, voice_parts } = req.body
  
    if (!song_name || !arranged_by || !voice_parts) {
      return res.status(400).json({ message: 'song_name, arranged_by, and voice_parts are required' })
    }
  
    const query = `
      INSERT INTO music (song_name, arranged_by, voice_parts)
      VALUES ($1, $2, $3)
      RETURNING *
    `
    pool.query(query, [song_name, arranged_by, voice_parts], (error, result) => {
      if (error) {
        console.error('Error inserting song', error)
        return res.status(500).json({ message: 'Failed to create song' })
      }
      res.status(201).json(result.rows[0])
    })
  }

// Read all data from DB
const getMusic = (req, res) => {
    pool.query('SELECT * FROM music ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

// Update existing song
const updateMusic = (req, res) => {
    const id = parseInt(req.params.id, 10)
    const { song_name, arranged_by, voice_parts } = req.body
  
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid ID' })
    }
  
    const query = `
      UPDATE music
      SET song_name = $1,
          arranged_by = $2,
          voice_parts = $3
      WHERE id = $4
      RETURNING *
    `
    pool.query(query, [song_name, arranged_by, voice_parts, id], (error, result) => {
      if (error) {
        console.error('Error updating song', error)
        return res.status(500).json({ message: 'Failed to update song' })
      }
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Song not found' })
      }
      res.status(200).json(result.rows[0])
    })
  }

// Delete song
const deleteMusic = (req, res) => {
    const id = parseInt(req.params.id, 10)
  
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid ID' })
    }
  
    pool.query('DELETE FROM music WHERE id = $1', [id], (error, result) => {
      if (error) {
        console.error('Error deleting song', error)
        return res.status(500).json({ message: 'Failed to delete song' })
      }
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Song not found' })
      }
      res.status(204).send()
    })
  }

module.exports = {
    createMusic,
    getMusic,
    updateMusic,
    deleteMusic
}