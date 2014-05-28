/**
 * @summary Application Config
 * @module main
 * @since 0.0.1
 * @requires {@link initialize}
 * @description
 *  This module provides a single point of entry for execution of an
 *  example RequireJS application via Node ({@link CLI}) or a browser
 *  ({@link DOM}).  After a quick test to determine the execution
 *  environment, an application config is loaded and the bootstrap
 *  process continues via {@link initialize}.
 */
if(require.config){
	/**
	 * @summary RequireJS via Hypertext
	 * @name DOM
	 * @since 0.0.1
	 */
	require.config({
		baseUrl: '../build/0.0.0/src/lib',
		paths: {
			'angular':       '../../lib/angular',
			'angular-route': '../../lib/angular-route',
			'ngDefine':      '../../lib/ngDefine',
			'ngParse':       '../../lib/ngParse',
			//backbone:    '../../lib/backbone',
			//bootstrap:   '../../lib/bootstrap',
			//datetime:    '../../lib/date.format',
			//encryption:  '../../lib/crypt.md5',
			//exoskeleton: '../../lib/exoskeleton',
			//i18n:        '../../lib/i18n',
			//jquery:      '../../lib/jquery',
			//loader:      '../../lib/loader',
			//swipe:       '../../lib/swipe',
			'underscore':    '../../lib/underscore',
			//xml2json:    '../../lib/xml2json'
		},
		shim: {
			'angular': {
				//deps: [ 'jquery' ],
				exports: 'angular'
			},
			'angular-route': {
				deps: [ 'angular' ],
			},
			'backbone': {
				deps: [ 'underscore', 'jquery' ],
				exports: 'Backbone'
			},
			'bootstrap': {
				deps: [ 'jquery' ]
			},
			'jquery': {
				exports: '$'
			},
			'underscore': {
				exports: '_'
			}
		}
	});
	require(['ngDefine', 'angular'], function(ngDefine, angular){
		require(['example/router'], function(){
			angular.bootstrap(document, ['example']);
		});
	});
} else {
	/**
	 * @summary RequireJS via Node
	 * @name CLI
	 * @since 0.0.1
	 */
	var requirejs = require('requirejs');
	requirejs.config({
		baseUrl: __dirname +'/lib',
		nodeRequire: require
	});
	requirejs(['initialize']);
}
