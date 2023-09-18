const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshExpiration: process.env.JWT_EXPIRATION_KEY_REFRESH_TOKEN,
  jwtRefreshSecret: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD,
}