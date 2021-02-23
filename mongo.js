const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]


const url =
    `mongodb+srv://lucioTicali:${password}@cluster0.acnd9.mongodb.net/heroes_db?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const heroSchema = new mongoose.Schema({
    name: String,
    date: Date,
    important: Boolean,
})

const Hero = mongoose.model('Hero', heroSchema)

const hero = new Hero({
    name: 'Batman',
    date: new Date(),
    important: false,
})

// hero.save().then(result => {
//     console.log('hero saved!')
//     mongoose.connection.close()
// })

Hero.find({}).then(result => {
    result.forEach(hero => {
        console.log(hero)
    })
    mongoose.connection.close()
})
