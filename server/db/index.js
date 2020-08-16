const mongoose = require('mongoose')
const keys = require('../../config/keys')

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(e => {
    console.log('Connection error', e.message)
  })

const db = mongoose.connection

module.exports = db