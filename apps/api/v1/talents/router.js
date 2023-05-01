const express = require('express')
const Router = express()
const { getAll, getOne, create, update, destroy } = require('./controller')

Router.post('/talents', create)
Router.get('/talents', getAll)
Router.get('/talents/:id', getOne)
Router.put('/talents/:id', update)
Router.delete('/talents/:id', destroy)

module.exports = Router