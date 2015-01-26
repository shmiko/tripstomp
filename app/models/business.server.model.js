'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Business Schema
 */
var BusinessSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Business name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Business', BusinessSchema);