'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Trip = mongoose.model('Trip'),
	_ = require('lodash');

/**
 * Create a Trip
 */
exports.create = function(req, res) {
	var trip = new Trip(req.body);
	trip.user = req.user;

	trip.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trip);
		}
	});
};

/**
 * Show the current Trip
 */
exports.read = function(req, res) {
	res.jsonp(req.trip);
};

/**
 * Update a Trip
 */
exports.update = function(req, res) {
	var trip = req.trip ;

	trip = _.extend(trip , req.body);

	trip.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trip);
		}
	});
};

/**
 * Delete an Trip
 */
exports.delete = function(req, res) {
	var trip = req.trip ;

	trip.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trip);
		}
	});
};

/**
 * List of Trips
 */
exports.list = function(req, res) { 
	Trip.find().sort('-created').populate('user', 'displayName').exec(function(err, trips) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trips);
		}
	});
};

/**
 * Trip middleware
 */
exports.tripByID = function(req, res, next, id) { 
	Trip.findById(id).populate('user', 'displayName').exec(function(err, trip) {
		if (err) return next(err);
		if (! trip) return next(new Error('Failed to load Trip ' + id));
		req.trip = trip ;
		next();
	});
};

/**
 * Trip authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.trip.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
