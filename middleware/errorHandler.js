const errorHandler = (error, req, res, next) => {
    let statusCode = 500
    switch (error.name) {
        case "CastError":
            statusCode = 400 // Bad Request
            break;
        case "ValidationError":
            statusCode = 422 // Unprocessable Entity
            break;
        case "MongoError":
            statusCode = 503 // Service Unavailable
            break;
        case "DuplicateKeyError":
            statusCode = 409 // Conflict
            break;
        case "QueryError":
            statusCode = 400 // Bad Request
            break;
        case "BulkWriteError":
            statusCode = 500 // Internal Server Error
            break;
        // Add more cases for different types of errors you might think of below
        default:
            statusCode = 500 // Internal Server Error
            break;
    }
    return res.status(statusCode).send(error.message)
}


module.exports = errorHandler