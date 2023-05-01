const Users = require('../../api/v1/users/model')
const { BadRequest, Unauthorized } = require('../../errors')
const { createTokenUser, createJwt } = require('../../utils')

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
    
    return token
}

module.exports = { signin }