'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Calendar Schema
 */
var CalendarSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Calendar Event',
		trim: true
	},
	event_desc: {
		type: String,
		default: '',
		trim: true
	},
	location: {
		type: String,
		default: '',
		trim: true
	},
	event_type: {
		type: String,
		default: '',
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

mongoose.model('Calendar', CalendarSchema);