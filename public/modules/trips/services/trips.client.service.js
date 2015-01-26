'use strict';

//Trips service used to communicate Trips REST endpoints
angular.module('trips').factory('Trips', ['$resource',
	function($resource) {
		return $resource('trips/:tripId', { tripId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);