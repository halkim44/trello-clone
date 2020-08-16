const Label = require('../models/Label');

const createLabel = (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a Label',
    })
  }

  const label = new Label(body)

  if (!label) {
    return res.status(400).json({ success: false, error: err })
  }

  label
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: label._id,
        message: 'Label created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Label not created!',
      })
    })
}

const updateLabel = async (req, res) => {
  const body = req.body

  if (!body) {
     return res.status(400).json({
        success: false,
        error: 'You must provide a body to update',
     })
  }

  Label.findOne({ _id: req.params.id }, (err, label) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Label not found!',
      })
    }
    label.title = body.title
    label.isClosed = body.isClosed

    label
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: label._id,
          message: 'Label updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Label not updated!',
        })
      })
  })
}

const deleteLabel = async (req, res) => {
  await Label.findOneAndDelete({_id: req.params.id}, (err, label) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!label) {
      return res
        .status(404)
        .json({ success: false, error: 'Label not found' })
    }

    return res.status(200).json({ success: true, data: label })
  }).catch(err => console.log(err))
}

const getLabelById = async (req, res) => {
  await Label.findOne({ _id: req.params.id }, (err, label) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!label) {
      return res
        .status(404)
        .json({ success: false, error: 'Label not found' })
    }
    return res.status(200).json({ success: true, data: label })
  }).catch(err => console.log(err))
}

const getLabels = async (req, res) => {
  await Label.find({}, (err, labels) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!labels.length) {
      return res
        .status(404)
        .json({ success: false, error: 'Label not found' })
    }
    return res.status(200).json({ success: true, data: labels })
  }).catch(err => console.log(err))
}

module.exports = {
  createLabel,
  updateLabel,
  deleteLabel,
  getLabels,
  getLabelById,

}