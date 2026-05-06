

const express = require('express');
const Router  = express.Router();
const { authorizationTokenVerify } = require('../settings/autho');
const busController = require('../controllers/busController');



Router.post('/busCreact', authorizationTokenVerify, busController.CreatBus);


Router.get('/Allbuses', busController.GetAllBus);
Router.get('/siglebus/:id',authorizationTokenVerify,  busController.SigleBus);

Router.put('/UpdateBus/:id', authorizationTokenVerify, busController.busUpdate);

Router.delete('/deleteBus/:id', authorizationTokenVerify, busController.DeleteSigleBus);
Router.delete('/deleteAllBus', busController.deleteAllBus);



module.exports = Router; 