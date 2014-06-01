/**
 * @summary
 *  Application Config
 * @since 0.0.1
 * @requires {@link core/cli core/cli}
 * @requires {@link core/dom core/dom}
 * @module main
 * @description
 *  This module provides a single point of entry for execution of an
 *  example RequireJS application via Node or a browser.  After a quick
 *  test to determine the execution environment, an application config
 *  is loaded and the bootstrap process continues via
 *  {@link core/cli CLI} or {@link core/dom DOM}.
 */
if(require.config){
	/**
	 * @summary RequireJS via Hypertext
	 * @external require
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
	require(['core/dom']);
} else {
	/**
	 * @summary RequireJS via Node
	 * @external requirejs
	 * @since 0.0.1
	 */
	var requirejs = require('requirejs');
	requirejs.config({
		baseUrl: __dirname +'/lib',
		nodeRequire: require
	});
	requirejs(['core/cli']);
}
