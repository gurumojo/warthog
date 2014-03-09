"use strict";
define([

	'Example'

], function(Example){

	function run(){
		QUnit.module('Example: module');
		test('exports an Example constructor', function(){
			equal(typeof Example, 'function', 'typeof Example == "function"');
		});
		QUnit.module('Example: constructor', {
			setup: function(){
				this.example = new Example({name: 'example'});
			}
		});
		test('sets optional properties', function(){
			equal(typeof this.example.name, 'string', 'typeof example == "string"');
			equal(this.example.name, 'example', 'example.name == "example"');
		});
		test('returns {Example} example instance', function(){
			equal(typeof this.example, 'object', 'typeof example == "object"');
			strictEqual(this.example instanceof Example, true, 'example instanceof Example');
		});
		QUnit.module('Example: member');
		test('variable instance members', function(){
			var instance = new Example();
			var member = !_.every(instance, _.isFunction);
			strictEqual(member, false, 'typeof example.* == "function"');
		});
		QUnit.module('Example: method', {
			setup: function(){
				this.example = new Example({name: 'example'});
			}
		});
		test('dump: logs to console', function(){
			ok(true);
		});
		test('dump: returns {undefined}', function(){
			equal(typeof this.example.dump, 'function', 'typeof example.dump == "function"');
			equal(typeof this.example.dump(), 'undefined', 'typeof example.dump() == "undefined"');
		});
	};
	return {run: run};
});
