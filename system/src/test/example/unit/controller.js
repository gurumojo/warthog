/**
 * angularity controller test
 *
 * @author theguy@gurumojo.net
 * @package angularity
 * @subpackage controller-test
 * @version 0.0.0
 */
'use strict';

/**
 * Controller Scenarios for Jasmine
 */
describe('controller', function(){

	var $scope, controller;

	beforeEach(module('gurumojo.controller'));

	describe('HomeController', function(){

		beforeEach(inject(function($rootScope, $controller, $location, $route){
			$location: $location;
			$route: $route;
			$scope = $rootScope.$new();	
			controller = $controller('HomeController', {
				$location: $location,
				$route: $route,
				$scope: $scope
			});
		}));

		it('includes a title attribute', function(){

			expect(typeof $scope.title).toBe('string');
		});

		it('includes a content attribute', function(){

			expect(typeof $scope.content).toBe('object');
		});

		it('includes a debug attribute', function(){

			expect(typeof $scope.debug).toBe('object');
			//expect($scope.debug.hasOwnProperty('location')).toBe('true');
			//expect($scope.debug.hasOwnProperty('params')).toBe('true');
			//expect($scope.debug.hasOwnProperty('route')).toBe('true');
			//expect($scope.debug.hasOwnProperty('scope')).toBe('true');
		});
	});

	describe('LoginController', function(){

		beforeEach(inject(function($rootScope, $controller){
			$scope = $rootScope.$new();	
			controller = $controller('LoginController', {
				$scope: $scope,
				session: {
					fetch: function(){ return 'fetch' },
					login: function(x){ return 'login' },
					logout: function(){ return 'logout' }
				}
			});
		}));

		it('exposes model methods', inject(function(){

			expect(typeof $scope.reset).toEqual('function');
			expect(typeof $scope.unchanged).toEqual('function');
			expect(typeof $scope.update).toEqual('function');
		}));

		it('resets model cache', inject(function(){

			expect($scope.user).not.toEqual($scope.cache);
			$scope.reset();
			expect($scope.user).toEqual($scope.cache);
		}));

		it('tests for model changes', inject(function(){

			expect($scope.user).not.toEqual($scope.cache);
			expect($scope.unchanged()).toEqual(false);
			$scope.reset();
			expect($scope.user).toEqual($scope.cache);
			expect($scope.unchanged()).toEqual(true);
		}));

		it('updates model cache', inject(function(){

			expect($scope.user).toBeUndefined();
			expect($scope.user).not.toEqual($scope.cache);
			$scope.update();
			expect($scope.user).toEqual($scope.cache);
		}));

		it('includes a debug attribute', function(){

			expect(typeof $scope.debug).toBe('object');
			//expect($scope.debug.hasOwnProperty('scope')).toBe('true');
			//expect($scope.debug.hasOwnProperty('session')).toBe('true');
		});
	});
});
