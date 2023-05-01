const { Unauthorized, Unauthenticated } = require('../errors')
const { isTokenValid } = require('../utils/jwt')

const authenticated = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      throw new Unauthenticated('Authenticated invalid')
    }

    const payload = isTokenValid({ token })
    
    // Attach the user and his permissions to the req object
    req.user = {
      name: payload.name,
      id: payload.userId,
      role: payload.role,
      email: payload.email,
      organizer: payload.organizer
    };

    // console.log(payload.email)

    next()
  } catch (error) {
    next(error)
  }
}

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Unauthorized('Unauthorized to acces this route')
    }
    next()
  }
}

module.exports = {authenticated, authorizeRoles}