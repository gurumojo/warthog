/**
 * RequireJS in Node
 *
 * @type {object}
 */
var requirejs = require('requirejs');

requirejs.config({
	baseUrl: __dirname,
	nodeRequire: require
});

/**
 * Application bootstrap demonstration
 *
 * @name main
 * @function
 * @param {function} Example AMD constructor
 */
requirejs(['example'], function(Example){
	var example = new Example({
		example: {
			name: 'example',
			attribute: null
		}
	});
	example.object = {
		name: 'object',
		attribute: 'example'
	};
	example.other = {
		name: 'other',
		attribute: null
	};
	console.log(example);
	console.log(example.search({attribute: 'example'}));
});
