const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    full_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    boards: [{type: Schema.Types.ObjectId, ref: 'board'}],
    recently_viewed_boards: [{type: Schema.Types.ObjectId, ref: 'board'}],
  }
)

module.exports = mongoose.model('user', User)