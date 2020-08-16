const CardGroup = require('../models/CardGroup');
const BoardControl = require('./board-ctrl');
const createCardGroup = (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a List Data',
    })
  }

  const newCardGroup = new CardGroup(body);

  if (!newCardGroup) {
    return res.status(400).json({ success: false, error: err })
  }
 
  newCardGroup
    .save()
    .then(() => {
      BoardControl.addCardGroupToBoard(newCardGroup.board, newCardGroup._id);
      return res.status(201).json({
        success: true,
        card_group: newCardGroup,
        message: 'CardGroup created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'CardGroup not created!',
      })
    })
}

const updateCardGroup = async (req, res) => {
  const body = req.body

  if (!body) {
     return res.status(400).json({
        success: false,
        error: 'You must provide a body to update',
     })
  }

  CardGroup.findOne({ _id: req.params.id }, (err, cardGroup) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'CardGroup not found!',
      })
    }
    cardGroup.title = body.title
    cardGroup.isClosed = body.isClosed

    cardGroup
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: cardGroup._id,
          message: 'CardGroup updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'CardGroup not updated!',
        })
      })
  })
}

const deleteCardGroup = async (req, res) => {
  await CardGroup.findOneAndDelete({_id: req.params.id}, (err, cardGroup) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!cardGroup) {
      return res
        .status(404)
        .json({ success: false, error: 'CardGroup not found' })
    }

    return res.status(200).json({ success: true, data: cardGroup })
  }).catch(err => console.log(err))
}

const getCardGroupById = async (req, res) => {
  await CardGroup.findOne({ _id: req.params.id }, (err, cardGroup) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!cardGroup) {
      return res
        .status(404)
        .json({ success: false, error: 'CardGroup not found' })
    }
    return res.status(200).json({ success: true, data: cardGroup })
  }).catch(err => console.log(err))
}

const getCardGroups = async (req, res) => {
  await CardGroup.find({}, (err, cardGroups) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!cardGroups.length) {
      return res
        .status(404)
        .json({ success: false, error: 'CardGroup not found' })
    }
    return res.status(200).json({ success: true, data: cardGroups })
  }).catch(err => console.log(err))
}

module.exports = {
  createCardGroup,
  updateCardGroup,
  deleteCardGroup,
  getCardGroups,
  getCardGroupById,

}