import React from 'react'
import { useState } from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Song Name</th>
        <th>Arranged By</th>
        <th>Voice Parts</th>
        <th>Actions</th>
      </tr>
    </thead>
  )
}

// Update TableBody to use IDs
const TableBody = (props) => {
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const handleEdit = (id, row) => {
    setEditingId(id)
    setEditData({ ...row })
  }

  const handleSave = (id) => {
    props.updateSong(id, editData)
    setEditingId(null)
    setEditData({})
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
  }

  const handleEditChange = (field, value) => {
    setEditData({
      ...editData,
      [field]: value
    })
  }

  const rows = props.songData.map((row, index) => {
    const isEditing = editingId === row.id
    const displayId = index + 1 // Position-based ID (1, 2, 3, ...)

    return (
      <tr key={row.id}>
        {isEditing ? (
          <>
            <td>{displayId}</td> {/* Show position-based ID */}
            <td>
              <input
                type="text"
                value={editData.songName || ''}
                onChange={(e) => handleEditChange('songName', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={editData.arrangedBy || ''}
                onChange={(e) => handleEditChange('arrangedBy', e.target.value)}
              />
            </td>
            <td>
              <select
                value={editData.voiceParts || ''}
                onChange={(e) => handleEditChange('voiceParts', e.target.value)}
              >
                <option value="">Select...</option>
                <option value="SATB">SATB</option>
                <option value="SSA">SSA</option>
                <option value="SSAA">SSAA</option>
                <option value="TTBB">TTBB</option>
                <option value="SAB">SAB</option>
                <option value="Unison">Unison</option>
              </select>
            </td>
            <td>
              <button onClick={() => handleSave(row.id)}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </td>
          </>
        ) : (
          <>
            <td>{displayId}</td> {/* Display position-based ID */}
            <td>{row.songName}</td>
            <td>{row.arrangedBy}</td>
            <td>{row.voiceParts}</td>
            <td>
              <button onClick={() => handleEdit(row.id, row)}>Edit</button>
              <button onClick={() => props.removeSong(row.id)}>Delete</button>
            </td>
          </>
        )}
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

const Table = (props) => {
  {
    /*TODO - return <table> component, TableHeader and TableBody  and pass props!*/
    return (
      <table>
        <TableHeader />
        <TableBody songData={props.songData} removeSong={props.removeSong} updateSong={props.updateSong} />
      </table>
    )
  }
}

export default Table
