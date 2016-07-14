"use strict";

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemController = require('./controllers/item');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');


mongoose.connect('mongodb://localhost:27017/locker');

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(passport.initialize());

var router = express.Router();

console.log(typeof authController.isClientAuthenticated);
console.log(typeof itemController.postItems);

router.route('/item')
	.post(authController.isClientAuthenticated, itemController.postItems)
	.get(authController.isClientAuthenticated, itemController.getItems);

router.route('/items/:item_id')
	.get(authController.isClientAuthenticated, itemController.getItem)
	.put(authController.isClientAuthenticated, itemController.putItem)
	.delete(authController.isClientAuthenticated, itemController.deleteItem);

router.route('/users')
	.post(userController.postUsers)
	.get(authController.isClientAuthenticated, userController.getUsers);

var clientController = require('./controllers/client');

router.route('/clients')
	.post(authController.isClientAuthenticated, clientController.postClients)
	.get(authController.isClientAuthenticated, clientController.getClients);
	

app.use('/api', router);

var port = 3000;
app.listen(port);

console.log(port);
