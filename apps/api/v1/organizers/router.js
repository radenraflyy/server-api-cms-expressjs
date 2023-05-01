const express = require('express')
const Router = express()
const { createCMSOrganizer, createCMSUser, getUsers } = require('./controller')
const { authenticated, authorizeRoles } = require('../../../middlewares/auth')

Router.post('/organizers', createCMSOrganizer)
Router.post('/users', authenticated, createCMSUser)
Router.get('/users', getUsers)

module.exports = Router