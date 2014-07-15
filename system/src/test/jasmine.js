/**
 * @summary Jasmine Config
 * @module test/jasmine
 * @since 0.0.2
 * @requires {@link initialize}
 * @description
 *  This module provides a single point of entry for execution of an
 *  example Jasmine test suite via Node ({@link CLI}) or a browser
 *  ({@link DOM}).  After a quick test to determine the execution
 *  environment, a test config is loaded and the bootstrap process
 *  continues via {@link initialize} or grunt-contrib-jasmine.
 */
if(require.config){
	/**
	 * @summary RequireJS via Hypertext
	 * @name DOM
	 * @since 0.0.2
	 */
	require.config({
		baseUrl: '../../../src/lib',
		paths: {
			underscore:  '../../lib/underscore'
		},
		shim: {
			underscore: {
				exports: '_'
			} 
		}
	});
} else {
	/**
	 * @summary RequireJS via Node
	 * @name CLI
	 * @since 0.0.2
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
