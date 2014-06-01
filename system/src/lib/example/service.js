/**
 * @summary
 *  AngularJS Service
 * @since 0.1.0
 * @namespace example/service
 * @description
 *  The main application service collection.
 */
ngDefine('example.service', [

	// dependencies

], function(module){
	'use strict';

	module.factory('meta',

		/**
		 * @summary
		 *  Meta Service
		 * @since 0.1.0
		 * @function example/service.meta
		 * @return
		 *  {object} meta instance
		 */
		function(){
			return {
				author: 'user@example.net',
				description: 'skeleton application',
				title: 'example',
				url: {
					base: '../build/0.0.0/',
					login: 'json/user/login',
					logout: 'json/user/logout'
				},
				version: '0.0.0'
			};
		}

		//$http({
		//	method: $scope.method,
		//	url: $scope.url,
		//	params: $scope.params,
		//	data: $scope.data,
		//	headers: $scope.headers,
		//	transformRequest: requestCallback,
		//	transformResponse: responseCallback,
		//	cache: $templateCache,
		//	timeout: 5000,
		//	withCredentials: true
		//}).

	).factory('crypto',

		['$http', 'meta',

		/**
		 * @summary
		 *  Crypto Service
		 * @since 0.1.0
		 * @function example/service.crypto
		 * @param
		 *  {ng.service} $http - XMLHttpRequest or JSONP
		 * @param
		 *  {example.service} meta - application configuration
		 * @return
		 *  {object} crypto instance
		 */
		function( $http, meta ){
			var crypto = {};
			$http.get(meta.url.base +'lib/crypt/md5.js').then(
				function(xhr){
					/* jshint -W054 */
					crypto.hash = new Function(xhr.data)();
					/* jshint +W054 */
				},
				function(xhr){
					console.log(xhr);
				}
			);
			return crypto;
		}]

	).factory('parser',

		['$http', 'meta',

		/**
		 * @summary
		 *  Parser Service
		 * @since 0.1.0
		 * @function example/service.parser
		 * @param
		 *  {ng.service} $http - XMLHttpRequest or JSONP
		 * @param
		 *  {example.service} meta - application configuration
		 * @return
		 *  {object} parser instance
		 */
		function( $http, meta ){
			var parser = {};
			$http.get(meta.url.base +'lib/x2js/xml2json.js').
				success(function(data){
					/* jshint -W054 */
					parser.x2js = new Function(data)();
					/* jshint +W054 */
				}).
				error(function(data, status){
					console.log(data);
				});
			return parser;
		}]

	).factory('session',

		['$http', 'crypto', 'meta',

		/**
		 * @summary
		 *  Session Service
		 * @since 0.1.0
		 * @function example/service.session
		 * @param
		 *  {ng.service} $http - XMLHttpRequest or JSONP
		 * @param
		 *  {example.service} crypto - secure hash algorithms
		 * @param
		 *  {example.service} meta - application configuration
		 * @return
		 *  {object} session instance
		 */
		function( $http, crypto, meta ){
			var auth = meta.url.base + meta.url.login,
				exit = meta.url.base + meta.url.logout,
				success = function(xhr){
					session.response = xhr;
					session.response.headers = xhr.headers();
					session.user = xhr.data.user;
				},
				error = function(xhr){
					session.response = xhr;
					session.response.headers = xhr.headers();
					session.user = {error: xhr.data};
				},
				fetch = function(){
					return $http.get(auth).then(success, error);
				},
				login = function(user){
					var data = {
						login: user.username,
						token: !crypto.hash ||
							crypto.hash.hex_md5(crypto.hash.hex_md5(user.password) + user.hash)
					};
					return $http.post(auth, data).then(success, error);
				},
				logout = function(){
					return $http.get(exit).then(session.fetch, error);
				},
				session = {
					fetch: fetch,
					login: login,
					logout: logout
				};
			return session;
		}]

	);

});
