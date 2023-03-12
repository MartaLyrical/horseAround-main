const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    mailingAddress: {
        type: String,
        required: true
    },
    numberOfHorses: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('owners', ownerSchema, 'owners')
