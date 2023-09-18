const userRefreshToken = require('../../api/v1/userRefreshToken/model')
const Users = require('../../api/v1/users/model')
const { BadRequest, NotFound } = require('../../errors')

const {
  createJwt,
  createTokenUser,
  isTokenValidRefreshToken
} = require('../../utils')

const createUserRefreshToken =  async (payload) => {
  const res = await userRefreshToken.create(payload)

  return res
}

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;
  const result = await userRefreshToken.findOne({
    refreshToken,
  });

  if (!result) throw new NotFound(`refreshToken tidak valid `);

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });


  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJwt({ payload: createTokenUser(userCheck) });

  return token;
};

module.exports = {
  createUserRefreshToken,
  getUserRefreshToken
}