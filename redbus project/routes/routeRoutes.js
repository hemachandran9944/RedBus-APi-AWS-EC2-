const express = require('express');
const Router  = express.Router();
const routeController = require('../controllers/routeController');
const jwt = require('jsonwebtoken');
const { authorizationTokenVerify } = require('../settings/autho');


Router.get('/getRoutersAll', routeController.GetAllRoute);
Router.get('/getSigleRoutesAll/:id',  authorizationTokenVerify, routeController.GetSigelMethodRouters);
Router.put('/routeUpdate/:id',  authorizationTokenVerify, routeController.UpdateRouts);
Router.delete('/delete-routes/:id',  authorizationTokenVerify, routeController.DeleteSigleRoute);
Router.delete('/delete-all-routes',  routeController.DeleteAllroutes);

module.exports = Router;