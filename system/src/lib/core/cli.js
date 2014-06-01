/**
 * @summary
 *  System Bootstrap Process
 * @since 0.0.1
 * @requires {@link Example Example}
 * @requires {@link module:ranch ranch}
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