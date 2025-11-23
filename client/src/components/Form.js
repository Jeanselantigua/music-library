import { useState } from 'react'

const Form = () => {
  const handleChange = (event) => {
    /*
            TODO - Logic for changing state based on form changes
        */
  }

  const onFormSubmit = (event) => {
    // to prevent page reload on form submit
    event.preventDefault()

    /*
            TODO - Logic for calling props to handle submission and setting state changes
        */
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Song Name:
        <input 
          type="text" 
          name="songName" 
          onChange={handleChange}
        />
      </label>
      <label>
        Arranged By:
        <input 
          type="text" 
          name="arrangedBy" 
          onChange={handleChange}
        />
      </label>
      <label>
        Voice Parts:
        <select name="voiceParts" onChange={handleChange}>
          <option value="">Select...</option>
          <option value="SATB">SATB</option>
          <option value="SSA">SSA</option>
          <option value="SSAA">SSAA</option>
          <option value="TTBB">TTBB</option>
          <option value="SAB">SAB</option>
          <option value="Unison">Unison</option>
        </select>
      </label>
      <button type="submit">Add Song</button>
    </form>
  )
}

export default Form
