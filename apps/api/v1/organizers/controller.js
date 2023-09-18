const { createOrganizers, createUsers, getAllOrganizers, getAllAdmins, getAllOwners, getAllUsers } = require('../../../services/mongoose/users')
const { StatusCodes } = require('http-status-codes')

const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizers(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createCMSUser = async (req, res, next) => {
  try {
    const result = await createUsers(req)

    res.status(StatusCodes.CREATED).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const getOrganizers = async (req, res, next) => {
  try {
    const result = await getAllOrganizers(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const getAdmins = async (req, res, next) => {
  try {
    const result = await getAllAdmins(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getOwners = async (req, res, next) => {
  try {
    const result = await getAllOwners(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createCMSOrganizer,
  createCMSUser,
  getOrganizers,
  getAdmins,
  getOwners,
  getUsers,
}