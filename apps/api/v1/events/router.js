const express = require('express')
const Router = express()
const { getEvents, getFindOneEvents, create, update, destroy } = require('./controller')

Router.get('/events', getEvents)
Router.get('/events/:id', getFindOneEvents)
Router.post('/events', create)
Router.put('/events/:id', update)
Router.delete('/events/:id', destroy)

module.exports = Router