import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Genres = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setData(res.data.data)
      })
  }, [])


  const deleteGenre = id => {
    axios
      .delete(`/api/genres/${id}`)
      .then(res => {
        const filteredData = data.filter(genre => genre.id !== id)
        setData(filteredData)
      })
  }



  const drawLine = record => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          <Link to={`generos/${record.id}`}><button className='btn btn-warning'><i className='far fa-edit'></i></button></Link>
          <button onClick={() => deleteGenre(record.id)} className='btn btn-danger ml-2'><i className='far fa-trash-alt'></i></button>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-warning' role='alert'>
          Você ainda não tem gêneros criados.
        </div>
        <Link to={'generos/novo'}><button className='btn btn-primary mt-2'><i className='far fa-plus-square'></i> Novo gênero</button></Link>
      </div>
    )
  }

  return (
    <div className='container mt-5'>
      <h1>Gêneros</h1>
      <table className='table mt-5'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Gênero</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(drawLine)}
        </tbody>
      </table>
      <Link to={'generos/novo'}><button className='btn btn-primary'><i className='far fa-plus-square'></i> Novo gênero</button></Link>
    </div>
  )
}

export default Genres