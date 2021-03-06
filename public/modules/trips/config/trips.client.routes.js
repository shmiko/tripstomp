'use strict';

//Setting up route
angular.module('trips').config(['$stateProvider',
	function($stateProvider) {
		// Trips state routing
		$stateProvider.
		state('listTrips', {
			url: '/trips',
			templateUrl: 'modules/trips/views/list-trips.client.view.html'
		}).
		state('createTrip', {
			url: '/trips/create',
			templateUrl: 'modules/trips/views/create-trip.client.view.html'
		}).
		state('viewTrip', {
			url: '/trips/:tripId',
			templateUrl: 'modules/trips/views/view-trip.client.view.html'
		}).
		state('editTrip', {
			url: '/trips/:tripId/edit',
			templateUrl: 'modules/trips/views/edit-trip.client.view.html'
		});
	}
]);