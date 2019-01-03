const mongoose = require('mongoose')

const ImgUserSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('ImgUser', ImgUserSchema)
