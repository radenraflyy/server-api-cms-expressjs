const mongoose = require('mongoose')
const { model, Schema } = mongoose

let imagesSchema = Schema(
  {
    name: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = model( 'Images', imagesSchema )