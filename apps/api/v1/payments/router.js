const express = require('express')
const Router = express()
const {create, getPayments, getOne, update, destroy} = require('./controller')
const { authenticated, authorizeRoles } = require('../../../middlewares/auth');

Router.get('/payments', authenticated, authorizeRoles('organizer'), getPayments);
Router.get(
  '/payments/:id',
  authenticated,
  authorizeRoles('organizer'),
  getOne
);
Router.put(
  '/payments/:id',
  authenticated,
  authorizeRoles('organizer'),
  update
);
Router.delete(
  '/payments/:id',
  authenticated,
  authorizeRoles('organizer'),
  destroy
);
Router.post('/payments', authenticated, authorizeRoles('organizer'), create);

module.exports = Router;