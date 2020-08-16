const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema(
  {
    title: {type: String, required: true},
    card_groups: [{type: Schema.Types.ObjectId, ref: 'cardGroup'}],
    is_closed: {type: Boolean, required: true},
    available_label: [{type: Schema.Types.ObjectId, ref: 'label'}],
    users: [{type: Object, required: true}],
    cards: [{type: Schema.Types.ObjectId, ref: 'card'}],
  },
  { timestamps: true },
)

module.exports = mongoose.model('board', Board)