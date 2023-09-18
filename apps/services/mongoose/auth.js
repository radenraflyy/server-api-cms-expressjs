const Users = require('../../api/v1/users/model')
const { BadRequest, Unauthorized } = require('../../errors')
const { createTokenUser, createJwt, createRefreshJwt } = require('../../utils')
const { createUserRefreshToken } = require('./userRefreshToken')

const signin = async (req) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequest('Pleas provide email and password')
  }

  const result = await Users.findOne({ email: email })
  
  if (!result) {
    throw new Unauthorized('Invalid Credential')
  }

    const isPasswordCorrect = await result.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new Unauthorized('Invalid Credential')
    }
    const token = createJwt({ payload: createTokenUser(result) })

    const refreshToken = createRefreshJwt({payload: createTokenUser(result)})
    await createUserRefreshToken({
      refreshToken,
      user: result._id 
    })

    return { token, refreshToken, role: result.role, email: result.email }
}

module.exports = { signin }