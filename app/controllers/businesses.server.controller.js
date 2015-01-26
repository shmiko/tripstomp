'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Business = mongoose.model('Business'),
	_ = require('lodash');

/**
 * Create a Business
 */
exports.create = function(req, res) {
	var business = new Business(req.body);
	business.user = req.user;

	business.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(business);
		}
	});
};

/**
 * Show the current Business
 */
exports.read = function(req, res) {
	res.jsonp(req.business);
};

/**
 * Update a Business
 */
exports.update = function(req, res) {
	var business = req.business ;

	business = _.extend(business , req.body);

	business.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(business);
		}
	});
};

/**
 * Delete an Business
 */
exports.delete = function(req, res) {
	var business = req.business ;

	business.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(business);
		}
	});
};

/**
 * List of Businesses
 */
exports.list = function(req, res) { 
	Business.find().sort('-created').populate('user', 'displayName').exec(function(err, businesses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(businesses);
		}
	});
};

/**
 * Business middleware
 */
exports.businessByID = function(req, res, next, id) { 
	Business.findById(id).populate('user', 'displayName').exec(function(err, business) {
		if (err) return next(err);
		if (! business) return next(new Error('Failed to load Business ' + id));
		req.business = business ;
		next();
	});
};

/**
 * Business authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.business.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
