/**
 * @summary
 *  AngularJS Controller
 * @since 0.1.0
 * @requires {@link external:angular angular}
 * @requires {@link external:ngDefine ngDefine}
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
			 * @summary
			 *  View Title
			 * @protected
			 * @memberof! example/controller.HomeController#
			 * @type {string}
			 */
			$scope.title = 'Home Page';
			/**
			 * @summary
			 *  View Content
			 * @memberof! example/controller.HomeController#
			 * @type {object}
			 */
			$scope.content = {
				name: 'Hola Mundo',
				description: 'A typical "Hello World" example'
			};
			/**
			 * @summary
			 *  View Debug
			 * @protected
			 * @memberof! example/controller.HomeController#
			 * @type {object}
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
			/**
			 * @summary
			 *  Session Fetch
			 * @memberof! example/controller.LoginController#
			 */
			$scope.fetch = function(){
				session.fetch().then(success);
			};
			/**
			 * @summary
			 *  Session Login
			 * @memberof! example/controller.LoginController#
			 */
			$scope.login = function(){
				session.login($scope.user).then(success);
			};
			/**
			 * @summary
			 *  Session Logout
			 * @memberof! example/controller.LoginController#
			 */
			$scope.logout = function(){
				session.logout().then(success);
			};
			/**
			 * @summary
			 *  Form Reset
			 * @memberof! example/controller.LoginController#
			 */
			$scope.reset = function(){
				$scope.user = angular.copy($scope.cache);
			};
			/**
			 * @summary
			 *  Form Unchanged
			 * @memberof! example/controller.LoginController#
			 * @returns
			 *  {boolean}
			 */
			$scope.unchanged = function(){
				return angular.equals($scope.user, $scope.cache);
			};
			/**
			 * @summary
			 *  Form Update
			 * @memberof! example/controller.LoginController#
			 */
			$scope.update = function(){
				$scope.cache = angular.copy($scope.user);
			};
			/**
			 * @summary
			 *  View Debug
			 * @protected
			 * @memberof! example/controller.LoginController#
			 * @type {object}
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
