const heroesRouter = require('express').Router()
const Hero = require('../models/hero')


heroesRouter.get('/', (request, response) => {
    Hero.find({}).then(heroes => {
      response.json(heroes)  
    })    
})

heroesRouter.get('/:id', (request, response, next) => {
    Hero.findById(request.params.id).then(h =>{
        if(h){
         response.json(h)   
        }else {
            response.status(404).end()
        }      
    })
    .catch(error => next(error))   
})

heroesRouter.post('/', (request, response) => {
    const body = request.body
    if(body.name === undefined){
        return response.status(404).json({
            error: 'Contenuto vuoto'
        })
    }

    const hero = new Hero({
        name: body.name,
        important: body.important || false,
        date: new Date()
    })

    hero.save().then(savedHeroe => {
        response.json(savedHeroe)
    })
})
heroesRouter.delete('/:id', (request, response, next) => {
    Hero.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})
heroesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const hero = {
        name: body.name,
        important: body.important,
    }

    Hero.findByIdAndUpdate(request.params.id, hero, { new: true })
        .then(updatedHero => {
            response.json(updatedHero)
        })
        .catch(error => next(error))
})

module.exports = heroesRouter
// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
//     console.error(error.message)

//     if (error.name === 'CastError') {
//         return response.status(400).send({ error: 'malformatted id' })
//     }

//     next(error)
// }
// app.use(errorHandler)
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)})