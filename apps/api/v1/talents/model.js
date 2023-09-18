const mongoose = require('mongoose')
const {model, Schema} = mongoose

let talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Nama Harus di Isi"],
    },
    role: {
      type: String,
      default: "-",
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Images", //harus sama dengan nama model atau dia memprefesikan ke column table mana
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizers",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = model('Talent', talentSchema)