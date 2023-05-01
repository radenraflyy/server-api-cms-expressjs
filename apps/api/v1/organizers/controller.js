const { createOrganizers, createUsers, getAllUsers } = require('../../../services/mongoose/users')
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

const getUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { createCMSOrganizer, createCMSUser, getUsers }