'use strict';

// Configuring the Articles module
angular.module('businesses').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Businesses', 'businesses', 'dropdown', '/businesses(/create)?');
		Menus.addSubMenuItem('topbar', 'businesses', 'List Businesses', 'businesses');
		Menus.addSubMenuItem('topbar', 'businesses', 'New Business', 'businesses/create');
	}
]);