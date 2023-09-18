const mongoose = require('mongoose')
const {model, Schema} = mongoose
const bcrypt = require('bcryptjs')

const participantSchema = Schema(
  {
    firstName : {
      type: String,
      required: [true, 'firstName wajib di isi'],
      minglength: 6,
      maxlength: 30
    },
    lastName : {
      type: String,
      minglength: 6
    },
    email : {
      type: String,
      unique: true,
      required: [true, 'Email Wajib di isi']
    },
    password : {
      type: String,
      required: [true, 'Email Wajib di isi'],
      minglength: 6
    },
    role : {
      type: String,
      default: '-'
    },
    status : {
      type: String,
      enum: ['active', 'not active'],
      default: 'not active'
    },
    otp : {
      type: String,
      required: true
    },
  },
  {timestamps: true}
)

participantSchema.pre('save', async function (next) {
  const Participant = this;
  if (Participant.isModified('password')) {
    Participant.password = await bcrypt.hash(Participant.password, 12);
  }
  next();
});

participantSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};


module.exports = model('Participants', participantSchema)