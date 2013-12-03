/**
 * RequireJS in HTML
 *
 * @type {object}
 */
require.config({
	baseUrl: '/build/0.0.0/src',
	paths: {
		backbone:   '../lib/backbone/1.0.0/min',
		bootstrap:  '../lib/bootstrap/2.3.1/min',
		datetime:   '../lib/date.format/1.2.3/min',
		encryption: '../lib/crypt.md5/2.1/min',
		i18n:       '../lib/i18n/2.0.2/min',
		jquery:     '../lib/jquery/1.9.1/min',
		json2:      '../lib/json2/2010-11-18/dev',
		loader:     '../lib/loader/min',
		nls:        '../lib/nls',
		swipe:      '../lib/swipe/2.0/dev',
		underscore: '../lib/underscore',
		xml2json:   '../lib/xml2json/1.0.6/min'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: [ 'underscore', 'jquery' ],
			exports: 'Backbone'
		},
		'jquery': {
			exports: '$'
		},
		'bootstrap': {
			deps: [ 'jquery' ]
		}
	}
});

/**
 * Application bootstrap demonstration
 *
 * @name main
 * @function
 * @param {function} Example AMD constructor
 */
require(['example'], function(Example){
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
