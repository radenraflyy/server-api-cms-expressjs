const { StatusCodes } = require('http-status-codes')
const customApiError = require('./custom-api-errors')

class Unauthorized extends customApiError{
  constructor(message) {
    super(message)
    this.StatusCodes = StatusCodes.FORBIDDEN
  }
} 

module.exports = Unauthorized