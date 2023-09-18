;const jwt = require('jsonwebtoken')
const { jwtExpiration, jwtSecret, jwtRefreshExpiration, jwtRefreshSecret } = require('../config')

// For Token
const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  })
  return token
}

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret)


// For Refresh Token
const createRefreshJwt = ({ payload }) => {
  const token = jwt.sign(payload, jwtRefreshSecret, {
    expiresIn: jwtRefreshExpiration,
  })
  return token
}

const isTokenValidRefreshToken = ({ token }) => jwt.verify(token, jwtRefreshSecret)

module.exports = {
  createJwt,
  createRefreshJwt,
  isTokenValid,
  isTokenValidRefreshToken
}