const express = require('express');
const router = express.Router();

const BoardCtrl = require('../controllers/board-ctrl');
const CardCtrl = require('../controllers/card-ctrl');
const CardGroupCtrl = require('../controllers/cardGroup-ctrl');
const LabelCtrl = require('../controllers/label-ctrl');
const UserCtrl = require('../controllers/user-ctrl');


router.post('/board', BoardCtrl.createBoard)
router.delete('/board/:id', BoardCtrl.deleteBoard)
router.get('/board/:id', BoardCtrl.getBoardById)
router.post('/board/card-group-order', BoardCtrl.updateCardGroupOrder)

router.post('/card', CardCtrl.createCard)
router.put('/card/:id', CardCtrl.updateCard)
router.delete('/card/:id', CardCtrl.deleteCard)
router.get('/card/:id', CardCtrl.getCardById)
router.get('/cards', CardCtrl.getCards)

router.post('/card-group', CardGroupCtrl.createCardGroup)
router.post('/card-group/card-order', CardGroupCtrl.updateCardOrder)
router.put('/card-group/:id', CardGroupCtrl.updateCardGroup)
router.delete('/card-group/:id', CardGroupCtrl.deleteCardGroup)
router.get('/card-group/:id', CardGroupCtrl.getCardGroupById)
router.get('/card-groups', CardGroupCtrl.getCardGroups)

router.post('/label', LabelCtrl.createLabel)
router.put('/label/:id', LabelCtrl.updateLabel)
router.delete('/label/:id', LabelCtrl.deleteLabel)
router.get('/label/:id', LabelCtrl.getLabelById)
router.get('/labels', LabelCtrl.getLabels)

router.post('/user/register', UserCtrl.createUser)
router.post('/user/login', UserCtrl.loginUser)
router.post('/user/boards', BoardCtrl.getBoardsByUserId)

module.exports = router