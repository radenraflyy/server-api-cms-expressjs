const mongoose = require('mongoose')
const { model, Schema } = mongoose

  let organizerSchema = Schema(
    {
      organizer: {
        type: String,
        required: [true, 'Peyelenggara harus diisi'],
      },
    },
    { timestamps: true }
  )

module.exports = model('Organizers', organizerSchema)
