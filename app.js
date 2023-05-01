const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const categoriesRouter = require('./apps/api/v1/categories/router')
const imagesRouter = require('./apps/api/v1/images/router')
const talentsRouter = require('./apps/api/v1/talents/router')
const eventsController = require('./apps/api/v1/events/router')
const organizerController = require('./apps/api/v1/organizers/router')
const authCMSUser = require('./apps/api/v1/auth/router')

const notFoundMiddleware = require('./apps/middlewares/not-found')
const HandlerErrorMiddleware = require('./apps/middlewares/handler-errors')

const v1 = '/api/v1/cms';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome To Api Teachden'
  })
})

app.use(v1, categoriesRouter)
app.use(v1, imagesRouter)
app.use(v1, talentsRouter)
app.use(v1, eventsController)
app.use(v1, organizerController)
app.use(v1, authCMSUser)

app.use(notFoundMiddleware)
app.use(HandlerErrorMiddleware)

module.exports = app;
