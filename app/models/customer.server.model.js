'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Please fill your firstname',
		trim: true
	},
	surname: {
		type: String,
		default: '',
		required: 'Please fill your surname',
		trim: true
	},
    street1: {
        type: String,
        default: '',
        required: 'Please fill your address',
        trim: true
    },
    street2: {
        type: String,
        default: '',
        trim: true
    },
    suburb: {
        type: String,
        default: '',
        required: 'Please fill your suburb',
        trim: true
    },
    postcode: {
        type: Number,
        required: 'Please fill your postcode/zipcode'
    },
    state: {
        type: String,
        default: '',
        required: 'Please fill your state',
        trim: true
    },
    country: {
        type: String,
        default: '',
        required: 'Please fill your country',
        trim: true
    },
    industry: {
        type: String,
        default: '',
        required: 'Please fill your industry',
        trim: true
    },
    email: {
        type: String,
        default: '',
        required: 'Please fill your email',
        trim: true
    },
    phone: {
        type: Number,
        required: 'Please fill your phone'
    },
    referred: {
        type: Boolean,
        required: 'Please fill your referred'
    },
    channel: {
        type: String,
        default: '',
        required: 'Please fill your channel',
        trim: true
    },
    type: {
        type: String,
        default: '',
        required: 'Please fill your type',
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

mongoose.model('Customer', CustomerSchema);
