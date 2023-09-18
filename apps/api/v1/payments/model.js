const mongoose = require('mongoose')
const {model, Schema} = mongoose

const PaymentSchema = Schema(
  {
    type: {
      type: String,
      required: [true, 'Tipe Pembayaran harus di isi'],
      minlength: 3,
      maxlength: 50
    },
    image: {
      type: mongoose.Types.ObjectId,  
      ref: 'Images',
      required: true
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true
    },
    organizer:{
      type: mongoose.Types.ObjectId,
      ref: 'Organizers',
      required: true
    },
  },
  {timestamps: true}
)

module.exports = model('Payment', PaymentSchema)