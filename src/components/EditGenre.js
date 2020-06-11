import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditGenre = ({ match }) => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    axios.get('/api/genres/' + match.params.id)
      .then(res => {
        setName(res.data.name)
      })
  }, [match.params.id]);

  const onChange = e => {
    setName(e.target.value)
  }

  const save = () => {
    axios.put('/api/genres/' + match.params.id, {
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
      <h1>Editar Gênero</h1>
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

export default EditGenre