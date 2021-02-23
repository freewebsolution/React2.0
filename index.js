require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method),
        console.log('Path:', request.path),
        console.log('Body:', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

const Hero = require('./models/heroes')

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

app.get('/api/heroes', (request, response) => {
    Hero.find({}).then(heroes => {
        response.json(heroes)
    })
})

app.get('/api/heroes/:id', (request, response, next) => {
    Hero.findById(request.params.id).then(h => {
        if(h){
          response.json(h)  
        } else {
            response.status(404).end()
        }       
    })
    .catch(error => next(error))
})
app.delete('/api/heroes/:id', (request, response, next) => {
    Hero.findByIdAndRemove(request.params.id)
    .then(r => {
        response.status(204).end()
    })
    .catch(error =>(error))
})

app.post('/api/heroes', (request, response) => {
    const body = request.body
    if (body.name === undefined) {
        return response.status(404).json({
            error: 'Contenuto vuoto'
        })
    }
    const hero = new Hero({
        name: body.name,
        important: body.important || false,
        date: new Date(),
    })

    hero.save().then(savedHero => {
        response.json(savedHero)  
    })    
})

app.put('/api/heroes/:id', (request, response, next) => {
    const body = request.body

    const hero = {
        name: body.name,
        important:body.important
    }
    Hero.findByIdAndUpdate(request.params.id, hero, {new: true})
    .then(updateHero => {
        response.json(updateHero)
    })
    .catch(error => next(error))
})

const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndPoint)

const errorHandler = (error,request,response,next) => {
    console.error(error.message)
    if(error.name === 'CastError') {
        return response.status(400).send({error: 'Id non esistente'})
    }
    next (error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
 console.log(`Server runing on port ${PORT}`)   
})
