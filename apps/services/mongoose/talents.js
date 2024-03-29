const Talents = require('../../api/v1/talents/model')

const { checkingImage } = require('./images')

const { BadRequest, NotFound } = require('../../errors')

const getAllTalents = async (req) => {
  const { keyword } = req.query
  
  let condition = { organizer: req.user.organizer }

  if (keyword) {
    condition = {...condition, name: {$regex: keyword, $options: 'i'}}
  }

  const result = await Talents.find(condition)
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('name role image')
  
  return result
}

const createTalents = async (req, res) => {
  const { name, role, image } = req.body
  
  // cari image dengan field image
  await checkingImage(image)

  // cari talents dan tiak boleh duplikat
  const check = await Talents.findOne({
    name,
    organizer: req.user.organizer,
  })
  
  if (check) throw new BadRequest('Pembicara nama sudah terdaftar')

  const result = await Talents.create({
    name,
    role,
    image,
    organizer: req.user.organizer,
  })

  return result
}

const getOneTalents = async (req) => {
  const { id } = req.params

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image")
  
  if (!result) throw new NotFound(`Tidak ada pembicara dengan id: ${id}`)

  return result
}

const updateTalents = async (req) => {
  const { id } = req.params
  const { name, role, image } = req.body
  
  await checkingImage(image)

  const check = await Talents.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne:id },
  })

  if (check) throw new BadRequest('Pembicara nama sudah terdaftar')

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    {
      name,
      image,
      role,
      organizer: req.user.organizer,
    },
    { new: true, runValidators: true }
  )

  if (!result) throw new NotFound(`Tidak ada pembicara dengan id : ${id}`)

  return result
}

const deleteTalents = async (req) => {
  const { id } = req.params
  
  const result = await Talents.findByIdAndRemove({
    _id: id,
    organizer: req.user.organizer,
  })
  
  if (!result) throw new NotFound(`Tidak ada pembicara dengan id : ${id}`)

  return result
}

const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result)
    throw new NotFound(`Tidak ada pembicara dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkingTalents
}