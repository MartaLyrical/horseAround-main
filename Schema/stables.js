const mongoose = require('mongoose')

const stablesSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    location: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    numberOfHorses: {
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model('stables', stablesSchema, 'stables')