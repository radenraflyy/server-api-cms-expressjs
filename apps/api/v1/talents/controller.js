const {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents } = require('../../../services/mongoose/talents')
const { StatusCodes } = require('http-status-codes');


const getAll = async (req, res, next) => {
  try {
    const result = await getAllTalents(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
} 

const getOne = async (req, res, next) => {
  try {
    const result = await getOneTalents(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
} 

const create = async (req, res, next) => {
  try {
    const result = await createTalents(req)

    res.status(StatusCodes.CREATED).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const result = await updateTalents(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const destroy = async (req, res, next) => {
  try {
    const result = await deleteTalents(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}