const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = `${process.env.MONGODB_URI}${process.env.URI_PROPS}`

mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v) // format like "xx-xxxxxxx" or "xxx-xxxxxxx"
      },
      message: (props) =>
        `${props.value} is not a valid phone number. Format: xx-xxxxxxx or xxx-xxxxxxx`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
