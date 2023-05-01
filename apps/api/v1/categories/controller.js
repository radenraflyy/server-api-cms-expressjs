const { StatusCodes } = require('http-status-codes');
const { getAllCategory, createCategories, getOneCategories, updateCategories, deleteCategories } = require('../../../services/mongoose/categories')


const createCategory = async (req, res, next) => {
  try {
    const result = await createCategories(req)

    res.status(StatusCodes.CREATED).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const getCategory = async (req, res, next) => {
  try {
    const result = await getAllCategory(req)
    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const findOneCategory = async (req, res, next) => {
  try {
    const result = await getOneCategories(req)
    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const result = await updateCategories(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const result = await deleteCategories(req)
    
    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createCategory,
  getCategory,
  findOneCategory,
  updateCategory,
  deleteCategory
}