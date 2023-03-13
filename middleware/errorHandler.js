const errorHandler = (error, req, res, next) => {
    console.log(error.name)
    return res.status(500).send(error.message)
};

module.exports = errorHandler