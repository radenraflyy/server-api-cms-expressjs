const express = require('express')
const Router = express()
const { signCms } = require('./controller')

Router.post('/sign', signCms)

module.exports = Router