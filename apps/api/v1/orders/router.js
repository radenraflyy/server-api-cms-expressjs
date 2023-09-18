const express = require('express')
const Router = express()
const { index } = require('./contoller')
const { authenticated, authorizeRoles } = require('../../../middlewares/auth')


Router.get('/orders', authenticated, authorizeRoles('organizer', 'admin', 'owner'), index)

module.exports  = Router