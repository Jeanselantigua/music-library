import { useState } from 'react'
import Table from './Table';
import Form from './Form';

const LinkContainer = (props) => {
  // State variable renamed from favLinks to songs
  const [songs, setSongs] = useState([])

  const handleRemove = (index) => {
    // Filter out the song at the given index
    setSongs(songs.filter((_, i) => i !== index))
  }

  const handleSubmit = (songEntry) => {
    // Add new song to the songs array in state
    setSongs([...songs, songEntry])
  }

  return (
    <div className="container">
      <h1>Music Library</h1>
      <Table songData={songs} removeSong={handleRemove} />
      <Form handleSubmit={handleSubmit} />
    </div>
  )
}

export default LinkContainer