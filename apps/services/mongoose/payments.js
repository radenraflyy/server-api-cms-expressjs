const Payment = require('../../api/v1/payments/model')
const { BadRequest, NotFound } = require('../../errors')
const {checkingImage} = require('./images')

const getAllPayments = async (req) => {
  let condition = {organizer: req.user.organizer}

  const result = await Payment.find(condition)
  .populate({
    path: 'image',
    select: '_id name'
  })
  .select('_id type status image')

  return result
}

const createPayments = async (req) => {
  const {type, image} = req.body

  await checkingImage(image)

  const check = await Payment.findOne
  ({
    type, 
    organizer: req.user.organizer
  })

  if (check) throw new BadRequest('Tipe Pembayaran Duplikat')

  const result = await Payment.create(
    {
      type,
      image,
      organizer: req.user.organizer
    }
  )

  return result
}

const getOnePayments = async (req) => {
  const {id} = req.params

  const result = await Payment.findOne({
    _id: id,
    organizer: req.user.organizer
  })
  .populate({
    path: 'image',
    select: '_id name'
  })
  .select('_id type status image')

  if (!result) throw new NotFound(`Tidak ada pembayaran dengan id: ${id}`)

  return result
}


const updatePayments = async(req) =>{
  const {id} = req.params
  const { type, image } = req.body

  const check = await Payment.findOne({
    type,
    organizer: req.user.organizer,
    _id: {$ne: id}
  })

  if(check) throw new BadRequest('Tipe Pembayaran Duplikat')

  const result = await Payment.findOneAndUpdate(
    {_id: id},
    {type, image, organizer: req.user.organizer},
    {new: true, runValidators: true}
  )

  if(!result) throw new NotFound(`Tidak ada pembicara dengan id: ${id}`)

  return result
}

const deletPayments = async (req) => {
  const {id} = req.params

  const result = await Payment.findByIdAndRemove({
    _id: id,
    organizer: req.user.organizer
  })

  if(!result) throw new NotFound(`Tidak ada pembicara dengan id: ${id}`)

  return result
}

const checkingPayment = async (req) => {
  const {id} = req.params

  const result = await Payment.findOne({ _id: id })

  if(!result) throw new NotFound(`Tidak ada pembicara dengan id: ${id}`)

  return result
}
module.exports = {
  getAllPayments, 
  createPayments,
  getOnePayments,
  updatePayments,
  deletPayments,
  checkingPayment,
}