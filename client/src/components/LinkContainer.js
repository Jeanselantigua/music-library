import { useState } from 'react'
import Table from './Table';
import Form from './Form';

const LinkContainer = (props) => {
  const [songs, setSongs] = useState([])
  const [nextId, setNextId] = useState(1) // Track next unique ID for operations

  const fetchSongs = async () => {
    // TODO - fetch songs from db for the table
    

    try {
      let response = await fetch('/music')
      console.log(response)
      let data = await response.json()
      console.log(data)
    }catch (error) {
      console.log(error)
    }
  }

  // Sort songs alphabetically by songName
  const sortedSongs = [...songs].sort((a, b) => {
    const nameA = (a.songName || '').toLowerCase()
    const nameB = (b.songName || '').toLowerCase()
    return nameA.localeCompare(nameB)
  })

  const handleRemove = (id) => {
    // Filter out the song with the given unique ID
    setSongs(songs.filter(song => song.id !== id))
  }

  const handleUpdate = (id, updatedSong) => {
    const updatedSongs = songs.map(song => 
      song.id === id ? { ...updatedSong, id } : song
    )
    setSongs(updatedSongs)
  }

  const handleSubmit = (songEntry) => {
    // Add new song with a unique ID (for operations)
    const newSong = {
      ...songEntry,
      id: nextId
    }
    setSongs([...songs, newSong])
    setNextId(nextId + 1)
  }

  return (
    <div className="container">
      <h1>Music Library</h1>
      <Form handleSubmit={handleSubmit} />
      <Table songData={sortedSongs} removeSong={handleRemove} updateSong={handleUpdate} />
    </div>
  )
}

export default LinkContainer