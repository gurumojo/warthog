/**
 * @summary Jasmine Config
 * @module test/example
 * @since 0.1.3
 * @requires {@link initialize}
 * @description
 *  This module provides a single point of entry for execution of unit
 *  tests written for Jasmine via Node ({@link CLI}) or a browser
 *  ({@link DOM}).  After a quick test to determine the execution
 *  environment, a test config is loaded and the bootstrap process
 *  continues via {@link initialize} or grunt-contrib-jasmine.
 */
if(require.config){
	/**
	 * @summary RequireJS via Hypertext
	 * @name DOM
	 * @since 0.1.3
	 */
	require.config({
		baseUrl: '../../lib',
		paths: {
			underscore:  '../../lib/underscore',
			ngDefine: '../../lib/ngDefine',
			ngParse: '../../lib/ngParse',
			angular: '../../lib/angular',
			'angular-mocks': '../../lib/angular-mocks',
			'angular-route': '../../lib/angular-route'
		},
		shim: {
			angular: {
				exports: 'angular'
			}, 
			'angular-mocks': {
				deps: ['angular']
			}, 
			'angular-route': {
				deps: ['angular']
			}, 
			underscore: {
				exports: '_'
			} 
		}
	});
} else {
	/**
	 * @summary RequireJS via Node
	 * @name CLI
	 * @since 0.1.3
	 * @todo replace unsupported shim
	 */
	var requirejs = require('requirejs');
	//var underscore = require('underscore');
	requirejs.config({
		baseUrl: __dirname +'/../../lib',
		paths: {
			underscore:  '../../lib/underscore'
		},
		//shim: {
		//	underscore: {
		//		exports: '_'
		//	} 
		//},
		nodeRequire: require
	});
	requirejs(['../test/jasmine/initialize']);
}
