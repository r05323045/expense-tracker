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
    type: String,
    required: true,
    enum: ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  },
  amount: {
    type: Number,
    trim: true,
    required: true
  }
})
module.exports = mongoose.model('Record', recordSchema)
