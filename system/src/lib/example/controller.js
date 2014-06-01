/**
 * @summary
 *  AngularJS Controller
 * @since 0.1.0
 * @namespace example/controller
 * @description
 *  The main application controller collection.
 */
ngDefine('example.controller', [

	// dependencies

], function(module){
	'use strict';

	module.controller('HomeController',

		['$scope', '$route', '$location',

		/**
		 * @summary
		 *  Home Controller
		 * @since 0.1.0
		 * @function example/controller.HomeController
		 * @param
		 *  {ng.service} $scope - execution context for expressions
		 * @param
		 *  {ngRoute.service} $route - controller and view bindings
		 * @param
		 *  {ng.service} $location - request path getters and setters
		 * @constructor
		 */
		function( $scope, $route, $location ){
			/**
			 * @memberof example/controller.HomeController
			 * @protected
			 */
			$scope.title = 'Home Page';
			/** @memberof example/controller.HomeController */
			$scope.content = {
				name: 'Hola Mundo',
				description: 'A typical "Hello World" example'
			};
			/**
			 * @memberof example/controller.HomeController
			 * @protected
			 */
			$scope.debug = {
				location: $location.url(),
				params: $route.current && $route.current.params,
				route: $route.routes[$location.url().split('?')[0]],
				scope: {
					content: $scope.content,
					title: $scope.title
				}
			};
		}]

	).controller('LoginController',

		['$scope', 'session',

		/**
		 * @summary
		 *  Login Controller
		 * @since 0.1.0
		 * @function example/controller.LoginController
		 * @param
		 *  {ng.service} $scope - execution context for expressions
		 * @param
		 *  {example.service} session - user authentication methods
		 * @constructor
		 */
		function( $scope, session ){
			$scope.cache = {};
			$scope.legend = 'login form';
			function success(){
				if(session.user.email){
					$scope.active = 1;
					$scope.legend = 'profile form';
				} else {
					$scope.active = 0;
					$scope.legend = 'login form';
				}
				$scope.http = angular.copy(session.response);
				$scope.time = new Date().toISOString();
				$scope.user = angular.copy(session.user);
				$scope.update();
			}
			/** @memberof example/controller.LoginController */
			$scope.fetch = function(){
				session.fetch().then(success);
			};
			/** @memberof example/controller.LoginController */
			$scope.login = function(){
				session.login($scope.user).then(success);
			};
			/** @memberof example/controller.LoginController */
			$scope.logout = function(){
				session.logout().then(success);
			};
			/** @memberof example/controller.LoginController */
			$scope.reset = function(){
				$scope.user = angular.copy($scope.cache);
			};
			/** @memberof example/controller.LoginController */
			$scope.unchanged = function(){
				return angular.equals($scope.user, $scope.cache);
			};
			/** @memberof example/controller.LoginController */
			$scope.update = function(){
				$scope.cache = angular.copy($scope.user);
			};
			/**
			 * @memberof example/controller.LoginController
			 * @protected
			 */
			$scope.debug = {
				//scope: {
				//	cache: $scope.cache,
				//	http: $scope.http,
				//	legend: $scope.legend
				//},
				session: session
			};
		}]
	);

});
