import { useState, useEffect } from 'react'
import Table from './Table';
import Form from './Form';

// Instead of '/music', use your backend URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

const LinkContainer = (props) => {
  const [songs, setSongs] = useState([])

  // load songs from db
  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    try {
      let response = await fetch(`${API_URL}/music`)
      let data = await response.json()
      const mappedData = data.map(song => ({
        id: song.id,
        songName: song.song_name,
        arrangedBy: song.arranged_by,
        voiceParts: song.voice_parts
      }))
      setSongs(mappedData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async (id) => {
    try {
      await fetch(`${API_URL}/music/${id}`, { method: 'DELETE' })
      fetchSongs() // Refresh the list
    } catch (error) {
      console.error('Error deleting song:', error)
    }
  }

  const handleUpdate = async (id, updatedSong) => {
    try {
      // Convert camelCase to snake_case for API
      const response = await fetch(`${API_URL}/music/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          song_name: updatedSong.songName,
          arranged_by: updatedSong.arrangedBy,
          voice_parts: updatedSong.voiceParts
        })
      })
      if (response.ok) {
        fetchSongs() // Refresh the list
      }
    } catch (error) {
      console.error('Error updating song:', error)
    }
  }

  const handleSubmit = async (songEntry) => {
    try {
      // Convert camelCase to snake_case for API
      const response = await fetch(`${API_URL}/music`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          song_name: songEntry.songName,
          arranged_by: songEntry.arrangedBy,
          voice_parts: songEntry.voiceParts
        })
      })
      if (response.ok) {
        fetchSongs() // Refresh the list
      }
    } catch (error) {
      console.error('Error creating song:', error)
    }
  }

  // Sort songs alphabetically by songName
  const sortedSongs = [...songs].sort((a, b) => {
    const nameA = (a.songName || '').toLowerCase()
    const nameB = (b.songName || '').toLowerCase()
    return nameA.localeCompare(nameB)
  })

  return (
    <div className="container">
      <h1>Music Library</h1>
      <Form handleSubmit={handleSubmit} />
      <Table songData={sortedSongs} removeSong={handleRemove} updateSong={handleUpdate} />
    </div>
  )
}

export default LinkContainer