const mongoose = require('mongoose')

const dietSchema = new mongoose.Schema({
    feedtype: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    deliveryTime: {
        type: Number,
        required: true
    },
    benefits: [{
        type: String
    }]
})

module.exports = mongoose.model('diet', dietSchema, 'diet')


