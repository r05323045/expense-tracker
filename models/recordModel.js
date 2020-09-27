const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String
  },
  amount: {
    type: Number,
    trim: true,
    required: true
  }
})
module.exports = mongoose.model('Record', recordSchema)
