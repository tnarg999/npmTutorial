"use strict";

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Client = require('../models/client');
var exports = module.exports = {};

passport.use('client-basic', new BasicStrategy(
	function(username, password, callback) {
		Client.findOne({ id: username}, function(err, client) {
			if (err) {
				return callback(err);
			}

			if(!client || client.secret !== password) {
				return callback(null, false);
			}

			return callback(null, client);
		});

	}
));

console.log(typeof passport.authenticate('client-basic', { session : false}));
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false});