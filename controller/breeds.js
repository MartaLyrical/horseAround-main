const mongodb = require('../db/mongoClientDb')

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('breeds').find()
    result.toArray().then((lists) => {
        res.status(200).json(lists);
    });
};


module.exports = {
    getAll
};