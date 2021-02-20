const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    date: {
        type: Date,
        required: true,
    },
    important: Boolean,
})

heroSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Hero', heroSchema)