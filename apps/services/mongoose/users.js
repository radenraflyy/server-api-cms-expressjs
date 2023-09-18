const Organizer = require('../../api/v1/organizers/model')
const Users = require('../../api/v1/users/model')
const { BadRequest } = require('../../errors')

const createOrganizers = async (req) => {
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequest('Password dan Konfirmasi password tidak cocok');
  }

  const result = await Organizer.create({ organizer });

  const users = await Users.create({
    email,
    name,
    password,
    organizer: result._id,
    role,
  });

  delete users._doc.password;

  return users;
};

const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequest('Password dan Konfirmasi password tidak cocok');
  }

  // console.log('req.user:', 'organizer'); 

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  return result;
};


const getAllOrganizers = async (req) => {
  const result = await Users.find({ role: 'organizer' });

  return result;
};

const getAllAdmins = async (req) => {
  const result = await Users.find({ role: "admin" })

  return result
}

const getAllOwners = async (req) => {
  const result = await Users.find({ role: "owner" })

  return result
}

const getAllUsers = async (req) => {
  const result = await Users.find()

  return result
}


module.exports = {
  createOrganizers,
  createUsers,
  getAllOrganizers,
  getAllAdmins,
  getAllOwners,
  getAllUsers,
}