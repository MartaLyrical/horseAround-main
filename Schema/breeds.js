const mongoose = require('mongoose')

const breedSchema = new mongoose.Schema({
    breedName: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    features: [{
        type: String
    }]
})

module.exports = mongoose.model('breeds', breedSchema, 'breeds')
