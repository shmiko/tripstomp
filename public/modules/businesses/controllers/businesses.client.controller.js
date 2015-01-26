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