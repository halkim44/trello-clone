const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardGroup = new Schema(
  {
    title: {type: String, required: true},
    is_archived: {type: Boolean, required: true, default: false},
    board: {type: Schema.Types.ObjectId, ref: 'board', required: true}
  }
)

module.exports = mongoose.model('cardGroup', CardGroup)