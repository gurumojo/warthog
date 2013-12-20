/**
 * @summary Test Config
 * @module test
 * @since 0.0.2
 * @requires {@link initialize}
 * @description
 *  This module provides a single point of entry for execution of an
 *  example QUnit test suite via Node ({@link CLI}) or a browser
 *  ({@link DOM}).  After a quick test to determine the execution
 *  environment, a test config is loaded and the bootstrap process
 *  continues via {@link initialize}.
 */
if(require.config){
	/**
	 * @summary RequireJS via Hypertext
	 * @name DOM
	 * @since 0.0.2
	 */
	require.config({
		baseUrl: '../lib',
		paths: {
			qunit: '../../lib/qunit',
			underscore:  '../../lib/underscore'
		},
		shim: {
			qunit: {
				exports: 'QUnit',
				init: function(){
					QUnit.config.autoload = false;
					QUnit.config.autostart = false;
				}
			},
			underscore: {
				exports: '_'
			} 
		}
	});
	require(['../test/lib/initialize']);
} else {
	/**
	 * @summary RequireJS via Node
	 * @name CLI
	 * @since 0.0.2
	 */
	var requirejs = require('requirejs');
	requirejs.config({
		baseUrl: __dirname +'/../lib',
		paths: {
			qunit: '../../lib/qunit',
			underscore:  '../../lib/underscore'
		},
		shim: {
			qunit: {
				exports: 'QUnit',
				init: function(){
					QUnit.config.autoload = false;
					QUnit.config.autostart = false;
				}
			},
			underscore: {
				exports: '_'
			} 
		},
		nodeRequire: require
	});
	requirejs(['../test/lib/initialize']);
}
