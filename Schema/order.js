const mongoose = require('mongoose')

const stablesOrderSchema = new mongoose.Schema({
    horseId: {
        type: String,
        requried: true
    },
    stablesId: {
        type: String,
        requried: true
    }
})

module.exports = mongoose.model('order', stablesOrderSchema, 'order')