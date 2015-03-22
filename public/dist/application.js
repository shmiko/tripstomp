'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'tripstomper';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils','ngMaterial'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
	.config(['$locationProvider',
		function($locationProvider) {
			$locationProvider.hashPrefix('!');
		}
	]);

	.config(["$mdThemingProvider", function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('yellow', {
	      'default': '400', // by default use shade 400 from the pink palette for primary intentions
	      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
	      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
	      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
	    })
	    // If you specify less than all of the keys, it will inherit from the
	    // default shades
	    .accentPalette('blue', {
	      'default': '200' // use shade 200 for default, and keep all other shades the same
	    });
	}]);

	angular.module(ApplicationConfiguration.applicationModuleName)
	.controller('AppCtrl', ["$scope", "$timeout", "$mdSidenav", "$log", function($scope, $timeout, $mdSidenav, $log) {
	  $scope.toggleLeft = function() {
	    $mdSidenav('left').toggle()
	      .then(function(){
	          $log.debug('toggle left is done');
	      });
	  };
	  $scope.toggleRight = function() {
	    $mdSidenav('right').toggle()
	                        .then(function(){
	                          $log.debug('toggle RIGHT is done');
	                        });
	  };
	}])
	.controller('LeftCtrl', ["$scope", "$timeout", "$mdSidenav", "$log", function($scope, $timeout, $mdSidenav, $log) {
	  $scope.close = function() {
	    $mdSidenav('left').close()
	                      .then(function(){
	                        $log.debug('close LEFT is done');
	                      });
	  };
	}])
	.controller('RightCtrl', ["$scope", "$timeout", "$mdSidenav", "$log", function($scope, $timeout, $mdSidenav, $log) {
	  $scope.close = function() {
	    $mdSidenav('right').close()
	                        .then(function(){
	                          $log.debug('close RIGHT is done');
	                        });
	  };
	}])

	angular.module(ApplicationConfiguration.applicationModuleName)
 .controller('AppCtrl', ["$scope", function($scope) {
  var COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];
  this.colorTiles = (function() {
    var tiles = [];
    for (var i = 0; i < 46; i++) {
    	var c1 = randomColor();
        var c4 = randomColor2();
        var c2 = invertCssColor(c1);
        var c3 = "Shmik"
      tiles.push({
      	back: c4,
        color: c2,
        colspan: randomSpan(),
        rowspan: randomSpan(),
        text: c3,
        text_color: c1
      });
    }

    return tiles;
  })();
  function randomColor2() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }
  
  function randomSpan() {
    var r = Math.random();
    if (r < 0.8) {
      return 1;
    } else if (r < 0.9) {
      return 2;
    } else {
      return 3;
    }
  }
	function invertColor2(hexTripletColor) {
	    var color = hexTripletColor;
	    color = color.substring(1);           // remove #
	    color = parseInt(color, 16);          // convert to integer
	    color = 0xFFFFFF ^ color;             // invert three bytes
	    color = color.toString(16);           // convert to hex
	    color = ("000000" + color).slice(-6); // pad with leading zeros
	    color = "#" + color;                  // prepend #
	    return color;
	}

	function randomColor() {
	    var color;
	    color = Math.floor(Math.random() * 0x1000000); // integer between 0x0 and 0xFFFFFF
	    color = color.toString(16);                    // convert to hex
	    color = ("000000" + color).slice(-6);          // pad with leading zeros
	    color = "#" + color;                           // prepend #
	    return color;
	}
    
    function invertCssColor(color) {
        var rgb = invertColor(hexColor2rgb(color));
        return rgb2hexColor(rgb);
    }
    
    function invertColor(rgb) {
        var yuv = rgb2yuv(rgb);
        var factor = 90;
        var threshold = 100;
        yuv.y = clamp(yuv.y + (yuv.y > threshold ? -factor : factor));
        return yuv2rgb(yuv);
    }
    
    function rgb2hexColor(rgb) {
        return '#' + dec2hex(rgb.r) + dec2hex(rgb.g) + dec2hex(rgb.b);
    }
    
    function hexColor2rgb(color) {
        color = color.substring(1); // remove #
        return {
            r: parseInt(color.substring(0, 2), 16),
            g: parseInt(color.substring(2, 4), 16),
            b: parseInt(color.substring(4, 6), 16)
        };
    }
    
    function rgb2hexColor(rgb) {
        return '#' + dec2hex(rgb.r) + dec2hex(rgb.g) + dec2hex(rgb.b);
    }
    
    function dec2hex(n) {
        var hex = n.toString(16);
        if (hex.length < 2) {
            return '0' + hex;
        }
        return hex;
    }

	function rgb2yuv(rgb){
	  var y = clamp(rgb.r *  0.29900 + rgb.g *  0.587   + rgb.b * 0.114);
	  var u = clamp(rgb.r * -0.16874 + rgb.g * -0.33126 + rgb.b * 0.50000 + 128);
	  var v = clamp(rgb.r *  0.50000 + rgb.g * -0.41869 + rgb.b * -0.08131 + 128);
	  return {y:y, u:u, v:v};
	}

	function yuv2rgb(yuv){
	  var y = yuv.y;
	  var u = yuv.u;
	  var v = yuv.v;
	  var r = clamp(y + (v - 128) *  1.40200);
	  var g = clamp(y + (u - 128) * -0.34414 + (v - 128) * -0.71414);
	  var b = clamp(y + (u - 128) *  1.77200);
	  return {r:r,g:g,b:b};
	}
	    
	function clamp(n){
	    if (n<0) { return 0;}
	    if (n>255) { return 255;}
	    return Math.floor(n);
	}


}]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('businesses');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('calendars');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('customers');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('maps');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('trips');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
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
'use strict';

// Businesses controller
angular.module('businesses').controller('BusinessesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Businesses',
	function($scope, $stateParams, $location, Authentication, Businesses) {
		$scope.authentication = Authentication;

		// Create new Business
		$scope.create = function() {
			// Create new Business object
			var business = new Businesses ({
				name: this.name
			});

			// Redirect after save
			business.$save(function(response) {
				$location.path('businesses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Business
		$scope.remove = function(business) {
			if ( business ) { 
				business.$remove();

				for (var i in $scope.businesses) {
					if ($scope.businesses [i] === business) {
						$scope.businesses.splice(i, 1);
					}
				}
			} else {
				$scope.business.$remove(function() {
					$location.path('businesses');
				});
			}
		};

		// Update existing Business
		$scope.update = function() {
			var business = $scope.business;

			business.$update(function() {
				$location.path('businesses/' + business._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Businesses
		$scope.find = function() {
			$scope.businesses = Businesses.query();
		};

		// Find existing Business
		$scope.findOne = function() {
			$scope.business = Businesses.get({ 
				businessId: $stateParams.businessId
			});
		};
	}
]);
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
'use strict';

// Configuring the Articles module
angular.module('calendars').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Calendars', 'calendars', 'dropdown', '/calendars(/create)?');
		Menus.addSubMenuItem('topbar', 'calendars', 'List Calendars', 'calendars');
		Menus.addSubMenuItem('topbar', 'calendars', 'New Calendar', 'calendars/create');
	}
]);
'use strict';

//Setting up route
angular.module('calendars').config(['$stateProvider',
	function($stateProvider) {
		// Calendars state routing
		$stateProvider.
		state('listCalendars', {
			url: '/calendars',
			templateUrl: 'modules/calendars/views/list-calendars.client.view.html'
		}).
		state('createCalendar', {
			url: '/calendars/create',
			templateUrl: 'modules/calendars/views/create-calendar.client.view.html'
		}).
		state('viewCalendar', {
			url: '/calendars/:calendarId',
			templateUrl: 'modules/calendars/views/view-calendar.client.view.html'
		}).
		state('editCalendar', {
			url: '/calendars/:calendarId/edit',
			templateUrl: 'modules/calendars/views/edit-calendar.client.view.html'
		});
	}
]);
'use strict';

// Calendars controller
angular.module('calendars').controller('CalendarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Calendars',
	function($scope, $stateParams, $location, Authentication, Calendars) {
		$scope.authentication = Authentication;

		// Create new Calendar
		$scope.create = function() {
			// Create new Calendar object
			var calendar = new Calendars ({
				name: this.name,
				event_desc: this.name,
				location: this.name,
				event_type: this.name
			});

			// Redirect after save
			calendar.$save(function(response) {
				$location.path('calendars/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.event_desc = '';
				$scope.location = '';
				$scope.event_type = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Calendar
		$scope.remove = function(calendar) {
			if ( calendar ) { 
				calendar.$remove();

				for (var i in $scope.calendars) {
					if ($scope.calendars [i] === calendar) {
						$scope.calendars.splice(i, 1);
					}
				}
			} else {
				$scope.calendar.$remove(function() {
					$location.path('calendars');
				});
			}
		};

		// Update existing Calendar
		$scope.update = function() {
			var calendar = $scope.calendar;

			calendar.$update(function() {
				$location.path('calendars/' + calendar._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Calendars
		$scope.find = function() {
			$scope.calendars = Calendars.query();
		};

		// Find existing Calendar
		$scope.findOne = function() {
			$scope.calendar = Calendars.get({ 
				calendarId: $stateParams.calendarId
			});
		};
	}
]);
'use strict';

//Calendars service used to communicate Calendars REST endpoints
angular.module('calendars').factory('Calendars', ['$resource',
	function($resource) {
		return $resource('calendars/:calendarId', { calendarId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.alerts = [
			{
				icon: 'glyphicon-globe',
				colour: 'btn-danger',
				text: '1st Map',
				description: 'MAP'
			},
			{
				icon: 'glyphicon-calendar',
				colour: 'btn-warning',
				text: '1st Calendar',
				description: 'CALENDAR'
			},
			{
				icon: 'glyphicon-road',
				colour: 'btn-success',
				text: '1st Trip',
				description: 'TRIP'
			},
			{
				icon: 'glyphicon-globe',
				colour: 'btn-info',
				text: '2nd Trip',
				description: 'TRIP'
			},
			{
				icon: 'glyphicon-globe',
				colour: 'btn-primary',
				text: '3rd Trip',
				description: 'TRIP'
			},
			{
				icon: 'glyphicon-globe',
				colour: 'btn-info',
				text: '4th Trip',
				description: 'TRIP'
			}
		];
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Configuring the Articles module
angular.module('customers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Customers', 'customers', 'dropdown', '/customers(/create)?');
		Menus.addSubMenuItem('topbar', 'customers', 'List Customers', 'customers');
		Menus.addSubMenuItem('topbar', 'customers', 'New Customer', 'customers/create');
	}
]);
'use strict';

//Setting up route
angular.module('customers').config(['$stateProvider',
	function($stateProvider) {
		// Customers state routing
		$stateProvider.
		state('listCustomers', {
			url: '/customers',
			templateUrl: 'modules/customers/views/list-customers.client.view.html'
		});
	}
]);
'use strict';

var tripstompApp = angular.module('customers');

// Customers controller
tripstompApp.controller('CustomersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Customers', '$modal', '$log',
	function($scope, $stateParams, $location, Authentication, Customers, $modal, $log) {
		
		this.authentication = Authentication;

		// Find a list of Customers
		this.customers = Customers.query();

		//Opens a modal to create a single customer
		this.modalCreate = function (size) {

		    var modalInstance = $modal.open({
		    	//this template url raltes to the client routes found in customers/config edit customer
			    templateUrl: 'modules/customers/views/create-customer.client.view.html',
			    controller: ["$scope", "$modalInstance", function($scope, $modalInstance){
			    	

			    	$scope.ok = function () {
			    		//if (createCustomerForm.$valid) {
							$modalInstance.close();
						//}
				  	};

				  	$scope.cancel = function () {
				    	$modalInstance.dismiss('cancel');
				  	};
			    }],
			    size: size
		    });

		    modalInstance.result.then(function (selectedItem) {
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		};

		//Opens a modal to update a single customer
		this.modalUpdate = function (size, selectedCustomer) {

		    var modalInstance = $modal.open({
		    	//this template url raltes to the client routes found in customers/config edit customer
			    templateUrl: 'modules/customers/views/edit-customer.client.view.html',
			    controller: ["$scope", "$modalInstance", "customer", function($scope, $modalInstance, customer){
			    	$scope.customer = customer;

			    	$scope.ok = function () {
			    		if (updateCustomerForm.$valid) {
							$modalInstance.close($scope.customerId);
						}
				  	};

				  	$scope.cancel = function () {
				    	$modalInstance.dismiss('cancel');
				  	};
			    }],
			    size: size,
			    resolve: {
		        customer: function () {
		          return selectedCustomer;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		};


		
		// Remove existing Customer
		this.remove = function(customer) {
			if ( customer ) { 
				customer.$remove();

				for (var i in this.customers) {
					if (this.customers [i] === customer) {
						this.customers.splice(i, 1);
					}
				}
			} else {
				this.customer.$remove(function() {
					
				});
			}
		};



		
	}
]);

tripstompApp.controller('CustomersCreateController', ['$scope', 'Customers', 'Notify',
	function($scope, Customers, Notify) {
		// Create new Customer
		this.create = function() {
			// Create new Customer object
			var customer = new Customers ({
				firstName: this.firstName,
                surname: this.surname,
                street1: this.street1,
                street2: this.street2,
                suburb: this.suburb,
                postcode: this.postcode,
                state: this.state,
                country: this.country,
                industry: this.industry,
                email: this.email,
                phone: this.phone,
                referred: this.referred,
                channel: this.channel,
                type: this.type
			});

			// Redirect after save
			customer.$save(function(response) {
				Notify.sendMsg('NewCustomer', {'id': response._id});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);

tripstompApp.controller('CustomersUpdateController', ['$scope', 'Customers',
	function($scope, Customers) {

		$scope.channelOptions = [
			{id: 1, choice: 'Facebook'},
			{id: 2, choice: 'Twitter'},
			{id: 3, choice: 'Email'},
		];

		// Update existing Customer
		this.update = function(updatedCustomer) {
			var customer = updatedCustomer;

			customer.$update(function() {
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

tripstompApp.directive('customerList', ['Customers', 'Notify', function(Customers, Notify){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/customers/views/customer-list-template.html',
		link: function(scope,element,attrs){
			//Update customer list when new customer is added
			Notify.getMsg('NewCustomer', function(event, data){

				scope.customersCtrl.customers = Customers.query();

			});
		}
	};
}]);
		

'use strict';

//Customers service used to communicate Customers REST endpoints
angular.module('customers')
	.factory('Customers', ['$resource',
		function($resource) {
			return $resource('customers/:customerId', { customerId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			});
		}
	])

	.factory('Notify', ['$rootScope', function($rootScope) {
			var notify = {};

			notify.sendMsg = function(msg, data){
				data = data || {};
				$rootScope.$emit(msg, data);

				console.log('Message sent!');
			};

			notify.getMsg = function(msg, func, scope){
				var unbind = $rootScope.$on(msg, func);

				if (scope) {
					scope.$on('destroy', unbind);
				}
			};

			return notify;
		}
	]);
'use strict';

// Configuring the Articles module
angular.module('maps').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Maps', 'maps', 'dropdown', '/maps(/create)?');
		Menus.addSubMenuItem('topbar', 'maps', 'List Maps', 'maps');
		Menus.addSubMenuItem('topbar', 'maps', 'New Map', 'maps/create');
	}
]);
'use strict';

//Setting up route
angular.module('maps').config(['$stateProvider',
	function($stateProvider) {
		// Maps state routing
		$stateProvider.
		state('listMaps', {
			url: '/maps',
			templateUrl: 'modules/maps/views/list-maps.client.view.html'
		}).
		state('createMap', {
			url: '/maps/create',
			templateUrl: 'modules/maps/views/create-map.client.view.html'
		}).
		state('viewMap', {
			url: '/maps/:mapId',
			templateUrl: 'modules/maps/views/view-map.client.view.html'
		}).
		state('editMap', {
			url: '/maps/:mapId/edit',
			templateUrl: 'modules/maps/views/edit-map.client.view.html'
		});
	}
]);
'use strict';

// Maps controller
angular.module('maps').controller('MapsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Maps',
	function($scope, $stateParams, $location, Authentication, Maps) {
		$scope.authentication = Authentication;

		// Create new Map
		$scope.create = function() {
			// Create new Map object
			var map = new Maps ({
				name: this.name
			});

			// Redirect after save
			map.$save(function(response) {
				$location.path('maps/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Map
		$scope.remove = function(map) {
			if ( map ) { 
				map.$remove();

				for (var i in $scope.maps) {
					if ($scope.maps [i] === map) {
						$scope.maps.splice(i, 1);
					}
				}
			} else {
				$scope.map.$remove(function() {
					$location.path('maps');
				});
			}
		};

		// Update existing Map
		$scope.update = function() {
			var map = $scope.map;

			map.$update(function() {
				$location.path('maps/' + map._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Maps
		$scope.find = function() {
			$scope.maps = Maps.query();
		};

		// Find existing Map
		$scope.findOne = function() {
			$scope.map = Maps.get({ 
				mapId: $stateParams.mapId
			});
		};
	}
]);
'use strict';

//Maps service used to communicate Maps REST endpoints
angular.module('maps').factory('Maps', ['$resource',
	function($resource) {
		return $resource('maps/:mapId', { mapId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
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
'use strict';

// Trips controller
angular.module('trips').controller('TripsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Trips',
	function($scope, $stateParams, $location, Authentication, Trips) {
		$scope.authentication = Authentication;

		// Create new Trip
		$scope.create = function() {
			// Create new Trip object
			var trip = new Trips ({
				name: this.name
			});

			// Redirect after save
			trip.$save(function(response) {
				$location.path('trips/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Trip
		$scope.remove = function(trip) {
			if ( trip ) { 
				trip.$remove();

				for (var i in $scope.trips) {
					if ($scope.trips [i] === trip) {
						$scope.trips.splice(i, 1);
					}
				}
			} else {
				$scope.trip.$remove(function() {
					$location.path('trips');
				});
			}
		};

		// Update existing Trip
		$scope.update = function() {
			var trip = $scope.trip;

			trip.$update(function() {
				$location.path('trips/' + trip._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Trips
		$scope.find = function() {
			$scope.trips = Trips.query();
		};

		// Find existing Trip
		$scope.findOne = function() {
			$scope.trip = Trips.get({ 
				tripId: $stateParams.tripId
			});
		};
	}
]);
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
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);