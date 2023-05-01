const { StatusCodes } = require('http-status-codes')
const customApiError = require('./custom-api-errors')

class Unauthenticated extends customApiError {
  constructor(message) {
    super(message)
    this.StatusCodes = StatusCodes.UNAUTHORIZED
  }
}

module.exports = Unauthenticated