const Board = require('../models/Board');
const User = require('../models/User');


const createBoard = (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a Board',
    })
  }

  const board = new Board({
    title: body.title,
    is_closed: false,
    users: { userId: body.userId }
  })

  if (!board) {
    return res.status(400).json({ success: false, error: err })
  }



  board
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        board,
        message: 'Board created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Board not created!',
      })
    })
}

const deleteBoard = async (req, res) => {
  await Board.findOneAndDelete({_id: req.params.id}, (err, board) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!board) {
      return res
        .status(404)
        .json({ success: false, error: 'Board not found' })
    }

    return res.status(200).json({ success: true, data: board })
  }).catch(err => console.log(err))
}

const getBoardById = async (req, res) => {
  await Board.findOne({ _id: req.params.id })
    .populate('card_groups cards')
    .exec(function (err, board) {
      if (err) {
        return res.status(400).json({ success: false, error: err })
      }
  
      if (!board) {
        return res
          .status(404)
          .json({ success: false, error: 'Board not found' })
      }
      return res.status(200).json({ success: true, data: board })
    })
}

const getBoardsByUserId = async (req, res) => {
  const userId = req.body.userId;
    await Board.find({ "users.userId": userId }, (err, boards) => {
      if (err) {
        return res.status(400).json({ success: false, error: err })
      }
      if (!boards.length) {
        return res
          .status(404)
          .json({ success: false, error: 'Boards not found' })
      }
      return res.status(200).json({ success: true, data: boards })
    }).catch(err => console.log(err))
}

const addCardGroupToBoard = (id, boardId) => {
  Board.findById({_id: id}, function (err, board) {
    if (err) {console.log(err)}
    board.card_groups.push(boardId);
    board.save();
  }).catch(err => console.log(err));
}
const addCardToBoard = (id, cardId) => {
  Board.findById({_id: id}, function (err, board) {
    if (err) {console.log(err)}

    board.cards.push(cardId);
    board.save();
  }).catch(err => console.log(err));
}
const updateCardGroupOrder = async (req, res) => {

  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide the card_group array and board Id',
    })
  }

  await Board.findById({_id: body.boardId}, function (err, board) {
    if (err) {console.log(err)}

    board.card_groups = body.newCardGroupOrder;
    board.save();
    return res.status(200).json({ success: true, data: board })
  }).catch(err => console.log(err));
}
module.exports = {
  createBoard,
  deleteBoard,
  getBoardById,
  getBoardsByUserId,
  addCardGroupToBoard,
  addCardToBoard,
  updateCardGroupOrder,
}