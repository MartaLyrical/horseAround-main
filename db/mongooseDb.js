const dotenv = require('dotenv')

dotenv.config()
const mongooseDb = require('mongoose')

mongooseDb.set('strictQuery', true)
mongooseDb.pluralize(null)

let _db;


const initDb = (callback) => {
  if (_db) {
    console.log('DB initialized already...')
    return callback(null, _db)
  }
  mongooseDb.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db)
    })
    .catch((err) => {
      callback(err)
    })
}

const getDb = () => {
  if (!_db) {
    throw Error('DB not initialized')
  }
  return _db;
}

module.exports = {
  initDb,
  getDb
}