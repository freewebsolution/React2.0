require('dotenv').config()
const express = require('express')
const app = express();
app.use(express.json())
app.use(express.static('build'))
const cors = require('cors')
app.use(cors())
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
const Hero = require('./models/hero')

app.use(requestLogger)

app.use(requestLogger)
app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/heroes', (request, response) => {
    Hero.find({}).then(heroes => {
      response.json(heroes)  
    })    
})
app.get('/api/heroes/:id', (request, response) => {
    const id = Number(request.params.id)
    const hero = heroes.find(hero => hero.id === id)
    if(hero){
       response.json(hero) 
    } else {
        response.status(404).end()
    }
    
})
const generateId =() => {
    const maxId = heroes.length > 0 ? Math.max(...heroes.map(h => h.id)): 0
    return maxId + 1
}
app.post('/api/heroes', (request, response) => {
    const body = request.body
    if(!body.name){
        return response.status(404).json({
            error: 'Contenuto vuoto'
        })
    }

    const hero = {
        name: body.name,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    heroes = heroes.concat(hero)

    response.json(hero)
})
app.delete('/api/heroes/:id', (request, response)=> {
    const id = Number(request.params.id)
    heroes = heroes.filter(hero => hero.id === id)
    response.status(204).end()
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)})
