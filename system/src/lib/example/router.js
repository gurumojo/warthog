/**
 * @summary
 *  AngularJS Router
 * @since 0.1.0
 * @requires {@link external:angular angular}
 * @requires {@link external:angular-route angular-route}
 * @requires {@link example/controller}
 * @requires {@link example/directive}
 * @requires {@link example/filter}
 * @requires {@link example/service}
 * @requires {@link external:ngDefine ngDefine}
 * @namespace example/router
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

	module.config(['$routeProvider',

		/**
		 * @summary
		 *  Default Routes
		 * @since 0.1.0
		 * @requires {@link https://docs.angularjs.org/api/ngRoute ngRoute}
		 * @function example/router.main
		 * @description
		 *  Declare $location.path handler configurations used by the angular
		 *  $route service.
		 */
		function( $routeProvider ){

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

		}

	]);

});
