const mongoose = require('mongoose')
const keys = require('../../config/keys')
require('dotenv').config();


mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(e => {
    console.log('Connection error', e.message)
  })

const db = mongoose.connection

module.exports = db