/**
 * @summary
 *  System Bootstrap Process
 * @since 0.0.1
 * @requires {@link core/model Model}
 * @namespace core/cli
 * @description
 *  This module provides a demonstration of how to bootstrap an example
 *  application. It is required by the {@link module:main main} module
 *  once it has determined that it is executing in a CLI environment,
 *  e.g. a Node shell. This is where one might include any shared
 *  modules common throughout the server interface or complete any
 *  necessary system initialization.
 */
define([

	'core/model'

], function(Model){

	var example = new Model({
		foo: true,
		bar: false
	});
	console.log('typeof example:', typeof example);
	console.log('example instanceof Model:', example instanceof Model);
	console.log('example:', example);
	console.log('Object.keys(example):', Object.keys(example));
	console.log('example.foo:', example.foo);
	console.log('delete example.foo:', delete example.foo);
	console.log('example.foo = undefined:', example.foo = undefined);
	console.log('example.get("foo", true):', example.get('foo', true));
});
