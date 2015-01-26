'use strict';

(function() {
	// Businesses Controller Spec
	describe('Businesses Controller Tests', function() {
		// Initialize global variables
		var BusinessesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Businesses controller.
			BusinessesController = $controller('BusinessesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Business object fetched from XHR', inject(function(Businesses) {
			// Create sample Business using the Businesses service
			var sampleBusiness = new Businesses({
				name: 'New Business'
			});

			// Create a sample Businesses array that includes the new Business
			var sampleBusinesses = [sampleBusiness];

			// Set GET response
			$httpBackend.expectGET('businesses').respond(sampleBusinesses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.businesses).toEqualData(sampleBusinesses);
		}));

		it('$scope.findOne() should create an array with one Business object fetched from XHR using a businessId URL parameter', inject(function(Businesses) {
			// Define a sample Business object
			var sampleBusiness = new Businesses({
				name: 'New Business'
			});

			// Set the URL parameter
			$stateParams.businessId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/businesses\/([0-9a-fA-F]{24})$/).respond(sampleBusiness);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.business).toEqualData(sampleBusiness);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Businesses) {
			// Create a sample Business object
			var sampleBusinessPostData = new Businesses({
				name: 'New Business'
			});

			// Create a sample Business response
			var sampleBusinessResponse = new Businesses({
				_id: '525cf20451979dea2c000001',
				name: 'New Business'
			});

			// Fixture mock form input values
			scope.name = 'New Business';

			// Set POST response
			$httpBackend.expectPOST('businesses', sampleBusinessPostData).respond(sampleBusinessResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Business was created
			expect($location.path()).toBe('/businesses/' + sampleBusinessResponse._id);
		}));

		it('$scope.update() should update a valid Business', inject(function(Businesses) {
			// Define a sample Business put data
			var sampleBusinessPutData = new Businesses({
				_id: '525cf20451979dea2c000001',
				name: 'New Business'
			});

			// Mock Business in scope
			scope.business = sampleBusinessPutData;

			// Set PUT response
			$httpBackend.expectPUT(/businesses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/businesses/' + sampleBusinessPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid businessId and remove the Business from the scope', inject(function(Businesses) {
			// Create new Business object
			var sampleBusiness = new Businesses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Businesses array and include the Business
			scope.businesses = [sampleBusiness];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/businesses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBusiness);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.businesses.length).toBe(0);
		}));
	});
}());