import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Badge } from 'reactstrap'

const Series = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => {
        setData(res.data.data)
      })
  }, [])


  const deleteSerie = id => {
    axios
      .delete(`/api/series/${id}`)
      .then(res => {
        const filteredData = data.filter(serie => serie.id !== id)
        setData(filteredData)
      })
  }

  const drawLine = record => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          {record.status === 'WATCHED' && <Badge color='success'>Já assisti</Badge>}
          {record.status === 'WATCHING' && <Badge color='warning'>Assistindo</Badge>}
          {record.status === 'TO_WATCH' && <Badge color='primary'>Quero assistir</Badge>}
          {record.status === 'none' && <Badge color='dark'>Não definido</Badge>}
        </td>
        <td>
          <Link to={`series/${record.id}`}><button className='btn btn-info'><i className='fas fa-info-circle'></i> Info</button></Link>
          <button onClick={() => deleteSerie(record.id)} className='btn btn-danger ml-2'><i className='far fa-trash-alt'></i></button>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-warning' role='alert'>
          Você ainda não tem séries criadas.
        </div>
        <Link to={'series/novo'}><button className='btn btn-primary mt-2'><i className='far fa-plus-square'></i> Nova série</button></Link>
      </div>
    )
  }

  return (
    <div className='container mt-5'>
      <h1>Series</h1>
      <table className='table mt-5'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Série</th>
            <th scope='col'>Status</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(drawLine)}
        </tbody>
      </table>
      <Link to={'series/novo'}><button className='btn btn-primary'><i className='far fa-plus-square'></i> Nova série</button></Link>
    </div>
  )
}

export default Series