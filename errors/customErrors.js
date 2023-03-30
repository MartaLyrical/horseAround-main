class IDNotFound extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = 'IDNotFound'
        this.statusCode = statusCode || 404
    }
}

class DuplicateError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = 'DuplicateError'
        this.statusCode = statusCode || 409
    }
}

module.exports = { IDNotFound, DuplicateError }