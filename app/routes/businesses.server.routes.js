'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var businesses = require('../../app/controllers/businesses.server.controller');

	// Businesses Routes
	app.route('/businesses')
		.get(businesses.list)
		.post(users.requiresLogin, businesses.create);

	app.route('/businesses/:businessId')
		.get(businesses.read)
		.put(users.requiresLogin, businesses.hasAuthorization, businesses.update)
		.delete(users.requiresLogin, businesses.hasAuthorization, businesses.delete);

	// Finish by binding the Business middleware
	app.param('businessId', businesses.businessByID);
};
