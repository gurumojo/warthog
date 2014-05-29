/**
 * @summary
 *  AngularJS Controller
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
		 * @param
		 *  {object} $scope - angular service
		 * @param
		 *  {object} $route - angular service
		 * @param
		 *  {object} $location - angular service
		 */
		function( $scope, $route, $location ){
			$scope.title = 'Home Page';
			$scope.content = {
				name: 'Hola Mundo',
				description: 'A typical "Hello World" example'
			};
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
		 * @param
		 *  {object} $scope - angular service
		 * @param
		 *  {object} session - custom service
		 */
		function( $scope, session ){
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
			$scope.fetch = function(){
				session.fetch().then(success);
			};
			$scope.login = function(){
				session.login($scope.user).then(success);
			};
			$scope.logout = function(){
				session.logout().then(success);
			};
			$scope.legend = 'login form';
			$scope.cache = {};
			$scope.reset = function(){
				$scope.user = angular.copy($scope.cache);
			};
			$scope.unchanged = function(){
				return angular.equals($scope.user, $scope.cache);
			};
			$scope.update = function(){
				$scope.cache = angular.copy($scope.user);
			};
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
