import React from 'react'

const TableHeader = () => {
  // boilerplate table header functional component
  return (
    <thead>
      <tr>
        <th>Song Name</th>
        <th>Arranged By</th>
        <th>Voice Parts</th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  // boilerplate table body functional component
  // we use Array.map to create table rows from LinkData passed via props
  const rows = props.musicData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.songName}</td>
        <td>{row.arrangedBy}</td>
        <td>{row.voiceParts}</td>
        <td>
          <button onClick={() => props.removeSong(index)}>Delete</button>
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

const Table = (props) => {
  {
    /*TODO - return <table> component, TableHeader and TableBody  and pass props!*/
    return <table></table>
  }
}

export default Table
