const {getAllPayments, createPayments, getOnePayments, updatePayments, deletPayments} = require('../../../services/mongoose/payments')

const {StatusCodes} = require('http-status-codes')

const getPayments = async(req, res, next) => {
  try {
    const result = await getAllPayments(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const create = async(req, res, next) => {
  try {
    const result = await createPayments(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const getOne = async(req, res, next) => {
  try {
    const result = await getOnePayments(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const update = async(req, res, next) => {
  try {
    const result = await updatePayments(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const destroy = async(req, res, next) => {
  try {
    const result = await deletPayments(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getPayments, create, getOne, update, destroy }