import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewGenre = () => {

  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  const onChange = e => {
    setName(e.target.value)
  }

  const save = () => {
    axios.post('/api/genres', {
      name
    })
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return (
      <Redirect to='/generos' />
    )
  }

  return (
    <div className='container mt-5'>
      <h1>Novo Gênero</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input type='text' className='form-control' id='name' onChange={onChange} value={name} />
          <button type='button' className='btn btn-primary mt-2' onClick={save}>Salvar</button>
        </div>
      </form>
    </div>
  )
}

export default NewGenre