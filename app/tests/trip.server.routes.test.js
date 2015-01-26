'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Trip = mongoose.model('Trip'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, trip;

/**
 * Trip routes tests
 */
describe('Trip CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Trip
		user.save(function() {
			trip = {
				name: 'Trip Name'
			};

			done();
		});
	});

	it('should be able to save Trip instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Trip
				agent.post('/trips')
					.send(trip)
					.expect(200)
					.end(function(tripSaveErr, tripSaveRes) {
						// Handle Trip save error
						if (tripSaveErr) done(tripSaveErr);

						// Get a list of Trips
						agent.get('/trips')
							.end(function(tripsGetErr, tripsGetRes) {
								// Handle Trip save error
								if (tripsGetErr) done(tripsGetErr);

								// Get Trips list
								var trips = tripsGetRes.body;

								// Set assertions
								(trips[0].user._id).should.equal(userId);
								(trips[0].name).should.match('Trip Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Trip instance if not logged in', function(done) {
		agent.post('/trips')
			.send(trip)
			.expect(401)
			.end(function(tripSaveErr, tripSaveRes) {
				// Call the assertion callback
				done(tripSaveErr);
			});
	});

	it('should not be able to save Trip instance if no name is provided', function(done) {
		// Invalidate name field
		trip.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Trip
				agent.post('/trips')
					.send(trip)
					.expect(400)
					.end(function(tripSaveErr, tripSaveRes) {
						// Set message assertion
						(tripSaveRes.body.message).should.match('Please fill Trip name');
						
						// Handle Trip save error
						done(tripSaveErr);
					});
			});
	});

	it('should be able to update Trip instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Trip
				agent.post('/trips')
					.send(trip)
					.expect(200)
					.end(function(tripSaveErr, tripSaveRes) {
						// Handle Trip save error
						if (tripSaveErr) done(tripSaveErr);

						// Update Trip name
						trip.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Trip
						agent.put('/trips/' + tripSaveRes.body._id)
							.send(trip)
							.expect(200)
							.end(function(tripUpdateErr, tripUpdateRes) {
								// Handle Trip update error
								if (tripUpdateErr) done(tripUpdateErr);

								// Set assertions
								(tripUpdateRes.body._id).should.equal(tripSaveRes.body._id);
								(tripUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Trips if not signed in', function(done) {
		// Create new Trip model instance
		var tripObj = new Trip(trip);

		// Save the Trip
		tripObj.save(function() {
			// Request Trips
			request(app).get('/trips')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Trip if not signed in', function(done) {
		// Create new Trip model instance
		var tripObj = new Trip(trip);

		// Save the Trip
		tripObj.save(function() {
			request(app).get('/trips/' + tripObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', trip.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Trip instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Trip
				agent.post('/trips')
					.send(trip)
					.expect(200)
					.end(function(tripSaveErr, tripSaveRes) {
						// Handle Trip save error
						if (tripSaveErr) done(tripSaveErr);

						// Delete existing Trip
						agent.delete('/trips/' + tripSaveRes.body._id)
							.send(trip)
							.expect(200)
							.end(function(tripDeleteErr, tripDeleteRes) {
								// Handle Trip error error
								if (tripDeleteErr) done(tripDeleteErr);

								// Set assertions
								(tripDeleteRes.body._id).should.equal(tripSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Trip instance if not signed in', function(done) {
		// Set Trip user 
		trip.user = user;

		// Create new Trip model instance
		var tripObj = new Trip(trip);

		// Save the Trip
		tripObj.save(function() {
			// Try deleting Trip
			request(app).delete('/trips/' + tripObj._id)
			.expect(401)
			.end(function(tripDeleteErr, tripDeleteRes) {
				// Set message assertion
				(tripDeleteRes.body.message).should.match('User is not logged in');

				// Handle Trip error error
				done(tripDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Trip.remove().exec();
		done();
	});
});