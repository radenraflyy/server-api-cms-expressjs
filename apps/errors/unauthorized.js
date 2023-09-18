const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api-errors');

class Unauthorized extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
module.exports = Unauthorized;