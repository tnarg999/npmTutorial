"use strict";

var Item = require('../models/item');
var exports = module.exports  = {};

exports.postItems = function(req, res) {

	var item = new Item();
	item.name = req.body.name;
	item.type = req.body.type;
	item.quantity = req.body.quantity;
	item.userId = req.user._id;

	item.save(function(err) {
		if (err) {
			res.send(err);
		}
		res.json({message: 'Item added to the locker!', data: item});
	});

};

exports.getItems = function(req, res) {
	Item.find({userId: req.user_id }, function(err, items) {
		if (err) {
			res.send(err);
		}
		res.json(items);
	});
};

exports.getItem = function(req, res) {
	Item.findById({userId: req.user_id, _id: req.params.item_id}, function(err, item) {
		if (err) {
			res.send(err);
		}
		res.json(item);
	});
};

exports.putItem = function(req, res) {
	Item.findById({ userId: req.user_id, _id: req.params.item_id}, function(err, item) {
		if(err) {
			res.json(err);
		}
		item.quantity = req.body.quantity;
		item.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json(item);
		});
	});
};

exports.deleteItem = function(req, res) {
	Item.findByIdAndRemove({ userId: req.user_id, _id: req.params.item_id}, function(err) {
		if (err) {
			res.json(err);
		}

		res.json({message: "Item removed from the locker!"});
	});
};