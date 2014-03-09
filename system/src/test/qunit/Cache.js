"use strict";
define([

	'underscore', 'Cache'

], function(_, Cache){

	function run(){
		QUnit.module('Cache: module');
		test('exports a Cache constructor', function(){
			equal(typeof Cache, 'function', 'typeof Cache == "function"');
		});
		QUnit.module('Cache: constructor');
		test('returns {Cache} cache instance', function(){
			var cache = new Cache();
			equal(typeof cache, 'object', 'typeof cache == "object"');
			equal(cache instanceof Cache, true, 'cache instanceof Cache');
		});
		QUnit.module('Cache: member');
		test('zero instance members', function(){
			var cache = new Cache();
			var member = !_.every(cache, _.isFunction);
			equal(member, false, 'typeof cache.* == "function"');
		});
		QUnit.module('Cache: method', {
			setup: function(){
				this.cache = new Cache();
			}
		});
		test('clean: empties the storage object', function(){
			this.cache.set('foo', 'bar');
			equal(this.cache.count(), 1, 'initial count == 1');
			this.cache.clean();
			equal(this.cache.count(), 0, 'final count == 0');
		});
		test('clean: returns {boolean} success indicator', function(){
			equal(typeof this.cache.clean(), 'boolean', 'typeof cache.clean() == "boolean"');
		});
		test('count: returns {number} stored item count', function(){
			equal(typeof this.cache.count(), 'number', 'typeof cache.count() == "number"');
			strictEqual(this.cache.count(), 0, 'final count === 0');
			this.cache.set('foo', 'bar');
			strictEqual(this.cache.count(), 1, 'initial count === 1');
		});
		test('get: accepts a string or an array of strings', function(){
			var result;
			this.cache.set('uno', 1);
			this.cache.set('dos', 2);
			result = this.cache.get('uno');
			strictEqual(result[0], 1, 'result[0] === 1');
			result = this.cache.get(['uno', 'dos']);
			strictEqual(result[0], 1, 'result[0] === 1');
			strictEqual(result[1], 2, 'result[1] === 2');
		});
		test('get: returns {array} cache property value(s)', function(){
			var result = this.cache.get();
			equal(typeof result, 'object', 'typeof result == "object"');
			equal(typeof result.length, 'number', 'typeof result.length == "number"');
			strictEqual(result.length, 0, 'result.length === 0');
			this.cache.set('foo', 'bar');
			result = this.cache.get('foo');
			equal(typeof result[0], 'string', 'typeof result[0] == "string"');
			strictEqual(result.length, 1, 'result.length === 1');
			equal(result[0], 'bar', 'result[0] == "bar"');
		});
		test('set: accepts a string for the first parameter', function(){
			throws(this.cache.set, 'string parameter required');
			equal(this.cache.set('foo'), undefined, 'typeof cache.set("foo") == undefined');
		});
		test('set: accepts any value for the second parameter', function(){
			function Foo(){}
			strictEqual(this.cache.set('foo'), undefined, 'cache.set("foo") === undefined');
			equal(this.cache.set('foo', 'bar'), 'bar', 'cache.set("foo", "bar") == "bar"');
			equal(this.cache.set('foo', 1), 1, 'cache.set("foo", 1) == 1');
			deepEqual(this.cache.set('foo', {}), {}, 'cache.set("foo", {}) == {}');
			deepEqual(this.cache.set('foo', []), [], 'cache.set("foo", []) == []');
			equal(this.cache.set('foo', Foo), Foo, 'cache.set("foo", Foo) == Foo');
		});
		test('set: returns {*} cache property value', function(){
			function Foo(){}
			var foo = new Foo();
			equal(this.cache.set('foo', foo), foo, 'cache.set("foo", foo) == foo');
			strictEqual(this.cache.get('foo')[0], foo, 'cache.get("foo")[0] === foo');
		});
		test('filter: accepts an object for the first parameter', function(){
			var result = this.cache.filter({});
			throws(this.cache.filter, 'object parameter required');
			equal(typeof result, 'object', 'typeof result == "object"');
			equal(typeof result.length, 'number', 'typeof result.length == "number"');
		});
		test('filter: returns {array} cache property value(s)', function(){
			var result;
			var foo = {
				uno: 1,
				dos: 2,
				tres: 3
			};
			this.cache.set('foo', foo);
			result = this.cache.filter({dos: 2});
			deepEqual(result[0], foo, 'result[0] === foo');
			result = this.cache.filter({uno: 1, dos: 2});
			deepEqual(result[0], foo, 'result[0] === foo');
			result = this.cache.filter({dos: 1});
			deepEqual(result[0], undefined, 'result[0] === undefined');
		});
	};
	return {run: run};
});
