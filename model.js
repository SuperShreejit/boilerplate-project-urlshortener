const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Url', urlSchema)