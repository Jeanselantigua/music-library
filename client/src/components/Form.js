import { useState } from 'react'

const Form = (props) => {
  const [formData, setFormData] = useState({
    songName: '',
    arrangedBy: '',
    voiceParts: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onFormSubmit = (event) => {
    // to prevent page reload on form submit
    event.preventDefault()

    // Call the handleSubmit prop with the form data
    props.handleSubmit(formData)

    // Reset the form
    setFormData({
      songName: '',
      arrangedBy: '',
      voiceParts: ''
    })
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Song Name:
        <input 
          type="text" 
          name="songName" 
          value={formData.songName}
          onChange={handleChange}
        />
      </label>
      <label>
        Arranged By:
        <input 
          type="text" 
          name="arrangedBy" 
          value={formData.arrangedBy}
          onChange={handleChange}
        />
      </label>
      <label>
        Voice Parts:
        <select name="voiceParts" value={formData.voiceParts} onChange={handleChange}>
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
