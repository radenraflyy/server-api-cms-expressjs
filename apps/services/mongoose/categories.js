const Categories = require('../../api/v1/categories/model')
const { BadRequest, NotFound } = require('../../errors')
const { notFound } = require('../../middlewares/not-found')


const getAllCategory = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer });

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  // cari categories dengan field name
  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
  });

  // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check) throw new BadRequest('kategori nama duplikat');

  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFound(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};
  
const updateCategories = async (req, res) => {
  const { id } = req.params
  const { name } = req.body 

  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne:id },
  })

  if (check) throw new BadRequest('category name duplicate')

  const result = Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  )

  if (!result) throw new notFound(`Tidak ada kategory dengan Id: ${id}`)
  
  return result
}

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new notFound(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
}

const checkingCategories = async (id) => {
  const result = await Categories.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllCategory,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories
}