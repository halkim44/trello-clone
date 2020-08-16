const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Card = new Schema(
  {
    content: {type: String, required: true},
    is_archived: {type: Boolean, required: true, default: false},
    due_date: {type: Date},
    board: {type: Schema.Types.ObjectId, ref: 'board'},
    card_group: {type: Schema.Types.ObjectId, ref: 'cardGroup'},
    labels: [{type: Schema.Types.ObjectId, ref: 'label'}],
  },
  { timestamps: true }
)

module.exports = mongoose.model('card', Card)