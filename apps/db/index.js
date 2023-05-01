const mongoose = require('mongoose');

const { urlDb } = require('../config')
// Connect ke Mongodb menggunakan kofigurasikan yang telah di import
mongoose.connect(urlDb)

const db = mongoose.connection

module.exports = db