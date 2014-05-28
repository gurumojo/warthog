/**
 * @summary
 *  AngularJS Service
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
		 * @return
		 *  {object} meta instance
		 */
		function(){ return {
			author: 'user@example.net',
			description: 'skeleton application',
			title: 'example',
			url: {
				base: '../build/0.0.0/',
				login: 'src/json/user/login',
				logout: 'src/json/user/logout'
			},
			version: '0.0.0'
		}}

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
		 * @param
		 *  {object} $http - angular service
		 * @param
		 *  {object} meta - custom service
		 * @return
		 *  {object} crypto instance
		 */
		function( $http, meta ){
			var crypto = {};
			$http.get(meta.url.base +'lib/crypt/md5.js').then(
				function(xhr){
					crypto.hash = Function(xhr.data)();
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
		 * @param
		 *  {object} $http - angular service
		 * @param
		 *  {object} meta - custom service
		 * @return
		 *  {object} parser instance
		 */
		function( $http, meta ){
			var parser = {};
			$http.get(meta.url.base +'lib/x2js/xml2json.js').
				success(function(data){
					parser.x2js = Function(data)();
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
		 *  Parser Service
		 * @param
		 *  {object} $http - angular service
		 * @param
		 *  {object} crypto - custom service
		 * @param
		 *  {object} meta - custom service
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
