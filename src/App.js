import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import heroeService from './service/heroes'


const App = () => {
  const [heroes, setHeroes] = useState([])
  const [newHero, setNewHero] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    heroeService
      .getAll()
      .then(initialHeroes => {
        setHeroes(initialHeroes)
      })
  }, [])


  const handleHeroChange = (e) => {
    setNewHero(e.target.value)
  }

  const heroesToShow = showAll
    ? heroes
    : heroes.filter(hero => hero.important)

  const toggleImportanceOf = id => {
    const hero = heroes.find(n => n.id === id)
    const changedHero = { ...hero, important: !hero.important }
    heroeService
      .update(id, changedHero)
      .then(returnHeroe => {
        setHeroes(heroes.map(hero => hero.id !== id ? hero : returnHeroe))
      })
      .catch(error => {
        alert(
          `The Hero '${hero.name} was already deleted from server`
        )
        setHeroes(heroes.filter(n => n.id !== id))
      })
  }
  const deleteHero = (id, name) => {
    const r = window.confirm(`Sicuro di voler cancellare l'eroe ${name} ?`)
    if (r === false) {
      return
    } else {

      heroes.filter(n => n.id === id)
      heroeService
        .deleteHero(id)
      .then(()=>{
        setHeroes(heroes.filter(hero => hero.id !== id))
      })
    }
  }
  const rows = () => heroesToShow.map(hero =>
    <Hero
      key={hero.id}
      hero={hero}
      toggleImportance={() => toggleImportanceOf(hero.id)}
      deleteHero={() => deleteHero(hero.id, hero.name)}
    >
    </Hero>)

  const addHero = (e) => {
    e.preventDefault()
    const heroObj = {
      name: newHero
    }
    heroeService
      .create(heroObj)
      .then(returnHeroe => {
        setHeroes(heroes.concat(returnHeroe))
        setNewHero('')
      })
  }
  return (
    <div className="container">
      <div className='row'>
        <h1>Heroes</h1>
        <div>
          <button className='waves-effect waves-light btn-small' onClick={() => setShowAll(!showAll)} type='submit'>Show{showAll ? 'Important' : 'All'}</button>
        </div>
        <ul className='collection'>
          {rows()}
        </ul>
        <form onSubmit={addHero} className='col s12'>
          <div className="input-field col s6">
            <input
              id='name'
              type='text'
              name='name'
              className='validate'
              value={newHero}
              onChange={handleHeroChange}
              required />
            <label htmlFor="name">Inserisci il nome...</label>
          </div>

          <button className='btn-floating  waves-effect waves-light green' type='submit'><i className="material-icons">add</i></button>
        </form>
      </div>
    </div>

  )
}

export default App