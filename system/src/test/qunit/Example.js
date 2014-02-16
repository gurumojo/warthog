"use strict";
define([

	'Example'

], function(Example){

	var run = function(){
		QUnit.module('module');
		test('exports an Example constructor function', function(){
			equal(typeof Example, 'function',
				'typeof Example == "function"');
		});
		QUnit.module('constructor');
		test('returns an Example instance', function(){
			equal(typeof new Example(), 'object',
				'typeof new Example() == "object"');
		});
		QUnit.module('members');
		test('object.get() returns optional properties', function(){
			var example = new Example({name: 'example'});
			equal(example.get('name')[0], 'example',
				'new Example({name: "example"}).get("name")[0] == "example"');
		});
		test('object.set() returns result boolean', function(){
			var example = new Example({name: 'warthog'});
			equal(example.get('name')[0], 'warthog',
				'example.get("name")[0] == "warthog"');
			strictEqual(example.set('name', 'example'), true,
				'example.set("name", "example") === true');
			equal(example.get('name')[0], 'example',
				'example.get("name")[0] == "example"');
		});
	};
	return {run: run};
});
