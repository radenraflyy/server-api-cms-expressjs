const express = require('express');
const Router = express();
const { create } = require('./controller');
const upload = require('../../../middlewares/multer');

Router.post('/images', upload.single('avatar'), create);
module.exports = Router;