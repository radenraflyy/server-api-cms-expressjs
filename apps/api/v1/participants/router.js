const express = require('express')
const Router = express()
const {signUp, active, signIn, getEventPage, getDetailPage, getDashboard, checkOut, getAllPayments} = require('./controller')
const {authenticatedParticipants} = require('../../../middlewares/auth')

Router.post('/auth/signup', signUp)
Router.post('/auth/signin', signIn)
Router.put('/active', active)
Router.get('/events', getEventPage)
Router.get('/events/:id', getDetailPage)
Router.get('/orders', authenticatedParticipants, getDashboard)
Router.post('/checkout', authenticatedParticipants, checkOut)
Router.get('/payments/:organizer', authenticatedParticipants, getAllPayments);




module.exports = Router