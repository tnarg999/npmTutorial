"use strict";

var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	name: String,
	type: String,
	quantity: Number,
	userId: String
});

module.exports = mongoose.model('Item', ItemSchema);
