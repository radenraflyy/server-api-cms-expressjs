const express = require('express')
const Router = express()
const {
  createCMSOrganizer,
  createCMSUser,
  getOrganizers,
  getAdmins,
  getOwners,
  getUsers,
} = require("./controller")
const { authenticated, authorizeRoles } = require('../../../middlewares/auth')

Router.post(
  "/organizers",
  authenticated,
  authorizeRoles("owner"),
  createCMSOrganizer
)
Router.post('/users', authenticated, authorizeRoles('organizer'), createCMSUser)
Router.get("/users", authenticated, authorizeRoles("owner"), getUsers)
Router.get('/organizers', getOrganizers)
Router.get("/admins", getAdmins)
Router.get("/owners", getOwners)


module.exports = Router