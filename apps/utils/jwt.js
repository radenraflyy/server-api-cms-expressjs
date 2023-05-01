const jwt = require('jsonwebtoken')
const { jwtExpiration, jwtSecret } = require('../config')

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  })
  return token
}

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret)

module.exports = {
  createJwt,
  isTokenValid
}