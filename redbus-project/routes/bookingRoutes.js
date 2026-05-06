
const express = require('express');
const Router  = express.Router();
const bookingRoutes = require ('../controllers/bookingController');
const { authorizationTokenVerify } = require('../settings/autho');


Router.post('/Creact',authorizationTokenVerify,  bookingRoutes.CreactBooking);


module.exports = Router;