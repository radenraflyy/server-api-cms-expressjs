const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();
const categoriesRouter = require('./apps/api/v1/categories/router')
const imagesRouter = require('./apps/api/v1/images/router')
const talentsRouter = require('./apps/api/v1/talents/router')
const eventsRouter = require('./apps/api/v1/events/router')
const organizerRouter = require('./apps/api/v1/organizers/router')
const authCMSUser = require('./apps/api/v1/auth/router')
const ordersRouter = require('./apps/api/v1/orders/router')
const participantRouter = require('./apps/api/v1/participants/router')
const paymentRouter = require('./apps/api/v1/payments/router')
const refreshTokenRouter = require('./apps/api/v1/userRefreshToken/router')

const notFoundMiddleware = require('./apps/middlewares/not-found')
const HandlerErrorMiddleware = require('./apps/middlewares/handler-errors')

const v1 = '/api/v1';

app.use(cors())
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

app.use(`${v1}/cms`, categoriesRouter)
app.use(`${v1}/cms`, imagesRouter)
app.use(`${v1}/cms`, talentsRouter)
app.use(`${v1}/cms`, eventsRouter)
app.use(`${v1}/cms`, organizerRouter)
app.use(`${v1}/cms`, authCMSUser)
app.use(`${v1}/cms`, ordersRouter)
app.use(`${v1}`, participantRouter)
app.use(`${v1}/cms`, paymentRouter)
app.use(`${v1}/cms`, refreshTokenRouter)


app.use(notFoundMiddleware)
app.use(HandlerErrorMiddleware)

module.exports = app;
