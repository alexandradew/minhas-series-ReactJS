import React from 'react'
import Header from './components/Header'
import Genres from './components/Genres'
import Series from './components/Series'
import NewGenre from './components/NewGenre'
import EditGenre from './components/EditGenre'
import NewSerie from './components/NewSerie'
import InfoSerie from './components/InfoSerie'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


const Home = () => {
  return (
    <div className='container'>
      <h1 className='mt-5'> Bem vindo ao minhas séries</h1>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos/novo' exact component={NewGenre} />
          <Route path='/generos/:id' exact component={EditGenre} />
          <Route path='/generos' exact component={Genres} />
          <Route path='/series/novo' exact component={NewSerie} />
          <Route path='/series/:id' exact component={InfoSerie} />
          <Route path='/series' exact component={Series} />
        </Switch>

      </div>
    </Router>
  );
}

export default App
