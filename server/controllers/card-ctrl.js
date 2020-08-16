const Card = require('../models/Card');
const BoardControl = require('./board-ctrl');

const createCard = (req, res) => {
  const body = req.body
  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a Card',
    })
  }

  const card = new Card(body)
  if (!card) {
    return res.status(400).json({ success: false, error: err })
  }
  card
    .save()
    .then(() => {
      BoardControl.addCardToBoard(card.board, card._id);
      return res.status(201).json({
        success: true,
        card,
        message: 'Card created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Card not created!',
      })
    })
}

const updateCard = async (req, res) => {
  const body = req.body
  if (!body) {
     return res.status(400).json({
        success: false,
        error: 'You must provide a body to update',
     })
  }

  Card.findOne({ _id: req.params.id }, (err, card) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Card not found!',
      })
    }
    card.title = body.title
    card.isClosed = body.isClosed
    card
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: card._id,
          message: 'Card updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Card not updated!',
        })
      })
  })
}

const deleteCard = async (req, res) => {
  await Card.findOneAndDelete({_id: req.params.id}, (err, card) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!card) {
      return res
        .status(404)
        .json({ success: false, error: 'Card not found' })
    }

    return res.status(200).json({ success: true, data: card })
  }).catch(err => console.log(err))
}

const getCardById = async (req, res) => {
  await Card.findOne({ _id: req.params.id }, (err, card) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!card) {
      return res
        .status(404)
        .json({ success: false, error: 'Card not found' })
    }
    return res.status(200).json({ success: true, data: card })
  }).catch(err => console.log(err))
}

const getCards = async (req, res) => {
  await Card.find({}, (err, cards) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!cards.length) {
      return res
        .status(404)
        .json({ success: false, error: 'Card not found' })
    }
    return res.status(200).json({ success: true, data: cards })
  }).catch(err => console.log(err))
}

module.exports = {
  createCard,
  updateCard,
  deleteCard,
  getCards,
  getCardById,

}