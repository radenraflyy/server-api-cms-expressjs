const Images = require('../../api/v1/images/model')
const {NotFound} = require('../../errors')

// 1. Cara pertama generate dulu images nya, dan ketika submit baru kesimpen iamges nya ke DB
const genarateUrlImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.png`
  })

  return result
}

// 2. langsung simpen ke DB tanpa generate
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.png`
  })

  return result
}

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id })
  console.log(result)

  if (!result) throw new NotFound(`Id tidak ditemukan : ${id}`)
  return result
}

module.exports = { createImages, genarateUrlImages, checkingImage }