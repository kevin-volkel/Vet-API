const mongoose = require('mongoose')

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      minlength: [2, 'Name must be 2 or more characters'],
      maxlength: [40, 'Name must be less than 40 characters']
    },
    age: {
      type: String,
      required: [true, 'Please provide an age'],
      match: [/[\d] (days||weeks||months||years)/g, 'Age formatted wrong']
    },
    gender: {
      type: String,
      required: [true, 'Please provide a gender'],
      enum: {
        values: ['male', 'female'],
        message: 'Please provide a gender'
      }
    },
    species: {
      type: String,
      required: [true, 'Please provide a species'],
      minlength: [3, 'Species must be at least 3 characters'],
      maxlength: [50, 'Species must be less than 50 characters']
    },
    image: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      minlength: [5, 'The description must be at least 5 characters long'],
    },
    extraInfo: {
      type: String
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model('Pet', PetSchema)