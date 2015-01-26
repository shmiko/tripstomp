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