const express = require('express');
const Router = express();
const { index } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

Router.get(
  '/refresh-token/:refreshToken',
  // authenticateUser,
  // authorizeRoles('organizer', 'admin', 'owner'),
  index
);

module.exports = Router;