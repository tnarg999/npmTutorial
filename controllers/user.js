"use strict";

var User = require('../models/user');
var exports = module.exports = {};

exports.postUsers = function(req, res) {
	console.log(req.body);
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err) {
		if(err) {
			res.send(err);
		}

		res.json({message: 'New person added to the locker room!'});

	});
};

exports.getUsers = function(req, res) {
	User.find(function(err, users) {
		if (err) {
			res.send(err);
		}

		res.json(users);
	});
};

