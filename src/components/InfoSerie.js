import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({ name: 'nome', status: 'status', genre_id: 'id', genre: 'genero' })
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('INFO')
  const [data, setData] = useState({})
  const [genres, setGenres] = useState([])

  useEffect(() => {
    axios.get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios.get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
      })
  }, [])

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  const onChange = field => e => {
    setForm({
      ...form,
      [field]: e.target.value,
    })
  }

  const save = () => {
    axios.put('/api/series/' + form.id, form)
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
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img className='img-fluid img-thumbnail' src={data.poster} alt={data.name} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  {data.status === 'WATCHED' && <Badge color='success'>Já assisti</Badge>}
                  {data.status === 'WATCHING' && <Badge color='warning'>Assistindo</Badge>}
                  {data.status === 'TO_WATCH' && <Badge color='primary'>Quero assistir</Badge>}
                  {data.genre && <p className='text-white mt-3'>Gênero: {data.genre}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {mode !== 'EDIT' && <div className='container mt-3'>
        <button className='btn btn-warning' onClick={() => setMode('EDIT')}><i className='far fa-edit'></i> Editar</button>
      </div>
      }
      {
        mode === 'EDIT' &&
        <div className='container mt-4'>
          <form className='pb-5'>
            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input type='text' className='form-control' id='name' onChange={onChange('name')} defaultValue={form.name} />
            </div>
            <div className='form-group'>
              <label htmlFor='comments'>Gênero</label>
              <select className='form-control' onChange={onChange('genre_id')} defaultValue={form.genre_id}>
                <option value='NO_GENRE'>Selecione o gênero</option>
                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='comments'>Status</label>
              <select className='form-control' onChange={onChange('status')} defaultValue={form.status}>
                <option value='none'>Selecione uma opção</option>
                <option value='WATCHED'>Já assisti</option>
                <option value='WATCHING'>Assistindo</option>
                <option value='TO_WATCH'>Quero assistir</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='comments'>Comentários</label>
              <input type='text' className='form-control' id='comments' defaultValue={form.comments} onChange={onChange('comments')} />
            </div>
            <button type='button' className='btn btn-primary mt-2' onClick={save}><i className='fas fa-save'></i> Salvar</button>
            <button type='button' className='btn btn-danger mt-2 ml-1' onClick={() => setMode('INFO')}><i className='fas fa-power-off'></i> Cancelar edição</button>
          </form>
        </div>
      }
    </div>
  )
}

export default InfoSerie