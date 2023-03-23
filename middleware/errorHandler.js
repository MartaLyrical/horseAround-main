const { IDNotFound, DuplicateError } = require('../errors/customErrors')

const errorHandler = (error, req, res, next) => {
    let statusCode = 500
    console.log(error.name)
    if (error instanceof IDNotFound) {
        statusCode = error.statusCode
    }
    if (error.name == "CastError") {
        error.message = 'Invalid input'
    }
    if (error instanceof DuplicateError) {
        statusCode = error.statusCode
    } else if (error.status) {
        statusCode = error.status
    }
    if (req.accepts('json')) {
        res.status(statusCode).json({ error: error.message })
    } else {
        res.status(statusCode).send(error.message)
    }
}

module.exports = errorHandler