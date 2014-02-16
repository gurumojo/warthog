/**
 * @summary
 *  System Bootstrap Process
 * @name
 *  initialize
 * @since
 *  0.0.1
 * @param
 *  {Example} Example - AMD constructor
 * @param
 *  {object} ranch - AMD object literal
 * @description
 *  This module provides a demonstration of how to bootstrap an example
 *  application. It is required by the {@link module:main main} module
 *  once it has determined whether it is executing in a {@link CLI} or
 *  {@link DOM} environment, allowing a single point of entry from
 *  either a browser window or a Node shell. This is where one might
 *  include any shared modules common throughout the application or
 *  complete any necessary system initialization.
 * @function
 */
define([

	'Example', 'ranch'

], function(Example, ranch){

	var example = new Example({
		option: {
			name: 'option',
			attribute: null
		}
	});
	example.ranch = ranch;
	example.dump();
});
