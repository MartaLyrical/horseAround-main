const express = require('express')

const breedsRouter = express.Router()
const breedsController = require('../controller/breeds')
const { tryCatch } = require("../utils/tryCatch")


breedsRouter.get('/', tryCatch(
    breedsController.getAll
))

module.exports = breedsRouter