'use strict';

//Businesses service used to communicate Businesses REST endpoints
angular.module('businesses').factory('Businesses', ['$resource',
	function($resource) {
		return $resource('businesses/:businessId', { businessId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);