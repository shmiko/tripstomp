'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var trips = require('../../app/controllers/trips.server.controller');

	// Trips Routes
	app.route('/trips')
		.get(trips.list)
		.post(users.requiresLogin, trips.create);

	app.route('/trips/:tripId')
		.get(trips.read)
		.put(users.requiresLogin, trips.hasAuthorization, trips.update)
		.delete(users.requiresLogin, trips.hasAuthorization, trips.delete);

	// Finish by binding the Trip middleware
	app.param('tripId', trips.tripByID);
};
