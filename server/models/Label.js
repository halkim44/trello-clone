const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Label = new Schema(
  {
    title: {type: String},
    color_hex: {type: String, min: 3, max: 6},
  }
)

module.exports = mongoose.model('label', Label)