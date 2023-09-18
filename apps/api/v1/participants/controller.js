const { signupParticipant, activeParticipant, signParticipant, getEventsPublished, getOneEnvents, getOrdersParticipants, checkoutOrder, getAllPaymentByOrganizer } = require('../../../services/mongoose/participants')
const { StatusCodes } = require('http-status-codes')

const signUp = async(req, res, next) =>{
  try {
    const result = await signupParticipant(req)

    res.status(StatusCodes.CREATED).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const active = async(req, res, next) =>{
  try {
    const result = await activeParticipant(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const signIn = async(req, res, next) =>{
  try {
    const result = await signParticipant(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const getEventPage = async(req, res, next) =>{
  try {
    const result = await getEventsPublished(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const getDetailPage = async(req, res, next) =>{
  try {
    const result = await getOneEnvents(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const getDashboard = async(req, res, next) =>{
  try {
    const result = await getOrdersParticipants(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const checkOut = async(req, res, next) => {
  try {
    const result = await checkoutOrder(req)

    res.status(StatusCodes.CREATED).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const getAllPayments = async (req, res, next) => {
  try {
    const result = await getAllPaymentByOrganizer(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  signUp,
  active,
  signIn,
  getEventPage,
  getDetailPage,
  getDashboard,
  checkOut,
  getAllPayments
}