/**
 * @summary
 *  AngularJS Router
 * @description
 *  The main application route request handler.
 */
ngDefine('example', [

	'module:ngRoute:angular-route',
	'module:example.controller',
	'module:example.directive',
	'module:example.filter',
	'module:example.service'

], function(module){
	'use strict';

	module.config(['$routeProvider', function( $routeProvider ){

		$routeProvider.when('/home', {
			controller: 'HomeController',
			//templateUrl: 'html/home.html'
			template:
				'<div app-debug="{{title}}"><pre>{{debug|json}}</pre></div>'+
				'<div input-text-editor="content.name"></div>'+
				'<div textarea-editor="content.description"></div>'
		});
	
		$routeProvider.when('/login', {
			controller: 'LoginController',
			template:
				'<div app-debug="{{legend}}"><pre>{{debug|json}}</pre></div>'+
				'<div user-session></div>'
		});
	
		$routeProvider.otherwise({redirectTo: '/home'});
	
	}]);

});
