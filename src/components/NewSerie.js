import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewSerie = () => {
  const [form, setForm] = useState({ name: '', comments: '' })
  const [success, setSuccess] = useState(false)
  const [genres, setGenres] = useState([])


  useEffect(() => {
    axios.get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
        console.log(res.data)
      })
  }, [])

  const onChange = field => e => {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }


  const save = () => {
    axios.post('/api/series', form)
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return (
      <Redirect to='/series' />
    )
  }

  return (
    <div className='container mt-5'>
      <h1>Nova Série</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input type='text' className='form-control' id='name' onChange={onChange('name')} value={form.name} />
        </div>
        <div className='form-group'>
          <label htmlFor='comments'>Gênero</label>
          <select className='form-control' onChange={onChange('genre_id')}>
            <option value='NO_GENRE'>Selecione o gênero</option>
            {genres.map(genre => <option key={genre.id} value={genre.id} defaultValue={genre.name === form.genre}>{genre.name}</option>)}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='comments'>Status</label>
          <select className='form-control' onChange={onChange('status')} value={form.status}>
            <option value='none'>Selecione uma opção</option>
            <option value='WATCHED'>Já assisti</option>
            <option value='WATCHING'>Assistindo</option>
            <option value='TO_WATCH'>Quero assistir</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='comments'>Comentários</label>
          <input type='text' className='form-control' id='comments' onChange={onChange('comments')} value={form.comments} />
        </div>
        <button type='button' className='btn btn-primary mt-2' onClick={save}>Salvar</button>
      </form>
    </div>
  )
}

export default NewSerie