
const express = require('express');
const Router  = express.Router();
const paymentController = require('../controllers/paymentController');
const jwt = require('jsonwebtoken');
const { authorizationTokenVerify } = require('../settings/autho');

Router.get('/getAllpayment',  paymentController.GetAllPayment);
Router.get('/getsiglepayment/:id', authorizationTokenVerify,  paymentController.Getsiglepayment);
Router.put('/PaymentUpdate/:id', authorizationTokenVerify,  paymentController.UpdatePayment);
Router.delete('/deletepayment/:id', authorizationTokenVerify,  paymentController.DeleteSiglePayment);
Router.delete('/deletepayment-all', paymentController.DeleteAllPayment);


module.exports = Router; 