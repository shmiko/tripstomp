'use strict';

//Setting up route
angular.module('businesses').config(['$stateProvider',
	function($stateProvider) {
		// Businesses state routing
		$stateProvider.
		state('listBusinesses', {
			url: '/businesses',
			templateUrl: 'modules/businesses/views/list-businesses.client.view.html'
		}).
		state('createBusiness', {
			url: '/businesses/create',
			templateUrl: 'modules/businesses/views/create-business.client.view.html'
		}).
		state('viewBusiness', {
			url: '/businesses/:businessId',
			templateUrl: 'modules/businesses/views/view-business.client.view.html'
		}).
		state('editBusiness', {
			url: '/businesses/:businessId/edit',
			templateUrl: 'modules/businesses/views/edit-business.client.view.html'
		});
	}
]);