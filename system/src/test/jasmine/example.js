"use strict";
define([

	'example'

], function(Example){

	var run = function(){
		describe('module', function(){
			it('exports an Example constructor function', function(){
				expect(typeof Example).toBe('function');
			});
		});
		describe('constructor', function(){
			it('returns an Example instance', function(){
				expect(typeof new Example()).toBe('object');
			});
		});
		describe('members', function(){
			it('object.get() returns optional properties', function(){
				var example = new Example({name: 'example'});
				expect(example.get('name')[0]).toBe('example');
			});
			it('object.set() returns result boolean', function(){
				var example = new Example({name: 'warthog'});
				expect(example.get('name')[0]).toBe('warthog');
				expect(example.set('name', 'example')).toEqual(true);
				expect(example.get('name')[0]).toBe('example');
			});
		});
	};
	return {run: run};
});
