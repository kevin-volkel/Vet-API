const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema(
  {
    userID: {
      ref: 'User',
      type: mongoose.Types.ObjectId,
      required: [true, 'Provide userID']
    },
    petID: {
      ref: 'Pet',
      type: mongoose.Types.ObjectId,
      required: [true, 'Provide petID']
    },
    status: {
      type: String,
      default: 'pending',
      enum: {
        values: ['pending', 'declined', 'accepted'],
        message: 'Not an valid status',
        default: 'pending'
      }
    }
  },
  {timestamps: true}
)

// RequestSchema.methods.expire = function () {
// 
// }

module.exports = mongoose.model('Request', RequestSchema)