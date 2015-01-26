'use strict';

// Configuring the Articles module
angular.module('trips').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Trips', 'trips', 'dropdown', '/trips(/create)?');
		Menus.addSubMenuItem('topbar', 'trips', 'List Trips', 'trips');
		Menus.addSubMenuItem('topbar', 'trips', 'New Trip', 'trips/create');
	}
]);