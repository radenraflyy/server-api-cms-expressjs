const CustomApiError = require('./custom-api-errors')
const BadRequest = require('./bad-request')
const NotFound = require('./not-found')
const Unauthorized = require('./unauthorized')
const Unauthenticated = require('./unauthenticated')

module.exports = {
  CustomApiError,
  BadRequest,
  NotFound,
  Unauthenticated,
  Unauthorized,
}