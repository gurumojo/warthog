"use strict";
define([

	'underscore', 'Cache'

], function(_, Cache){

	function run(){
		describe('Cache', function(){
			it('exports a Cache constructor', function(){
				expect(typeof Cache).toBe('function');
			});
			describe('constructor', function(){
				it('returns {Cache} new instance', function(){
					var cache = new Cache();
					expect(typeof cache).toBe('object');
					expect(cache instanceof Cache).toEqual(true);
				});
			});
			describe('member', function(){
				describe('n/a', function(){
					var cache = new Cache();
					it('zero instance members', function(){
						var member = !_.every(cache, _.isFunction);
						expect(member).toEqual(false);
					});
				});
			});
			describe('method', function(){
				beforeEach(function(){
					this.cache = new Cache();
				});
				describe('clean', function(){
					it('empties the storage object', function(){
						this.cache.set('foo', 'bar');
						expect(this.cache.count()).toEqual(1);
						this.cache.clean();
						expect(this.cache.count()).toEqual(0);
					});
					it('returns {boolean} success indicator', function(){
						expect(typeof this.cache.clean()).toBe('boolean');
					});
				});
				describe('count', function(){
					it('returns {number} stored item count', function(){
						expect(typeof this.cache.count()).toBe('number');
						expect(this.cache.count()).toEqual(0);
						this.cache.set('foo', 'bar');
						expect(this.cache.count()).toEqual(1);
					});
				});
				describe('get', function(){
					var result;
					it('accepts a string or an array of strings', function(){
						this.cache.set('uno', 1);
						this.cache.set('dos', 2);
						result = this.cache.get('uno');
						expect(result[0]).toEqual(1);
						result = this.cache.get(['uno', 'dos']);
						expect(result[0]).toEqual(1);
						expect(result[1]).toEqual(2);
					});
					it('returns {array} property value(s)', function(){
						result = this.cache.get();
						expect(typeof result).toBe('object');
						expect(typeof result.length).toBe('number');
						expect(result.length).toEqual(0);
						this.cache.set('foo', 'bar');
						result = this.cache.get('foo');
						expect(typeof result[0]).toBe('string');
						expect(result.length).toEqual(1);
						expect(result[0]).toBe('bar');
					});
				});
				describe('set', function(){
					it('accepts a string for the first parameter', function(){
						expect(this.cache.set).toThrow('string parameter required');
						expect(this.cache.set('foo')).toEqual(undefined);
					});
					it('accepts any value for the second parameter', function(){
						function Foo(){}
						expect(this.cache.set('foo')).toEqual(undefined);
						expect(this.cache.set('foo', 'bar')).toBe('bar');
						expect(this.cache.set('foo', 1)).toEqual(1);
						expect(this.cache.set('foo', {})).toEqual({});
						expect(this.cache.set('foo', [])).toEqual([]);
						expect(this.cache.set('foo', Foo)).toBe(Foo);
					});
					it('returns {*} property value', function(){
						function Foo(){}
						var foo = new Foo();
						expect(this.cache.set('foo', foo)).toBe(foo);
						expect(this.cache.get('foo')[0]).toBe(foo);
					});
				});
				describe('filter', function(){
					var result;
					it('accepts an object for the first parameter', function(){
						expect(this.cache.filter).toThrow('object parameter required');
						result = this.cache.filter({});
						expect(typeof result).toBe('object');
						expect(typeof result.length).toBe('number');
					});
					it('returns {array} property value(s)', function(){
						var foo = {
							uno: 1,
							dos: 2,
							tres: 3
						};
						this.cache.set('foo', foo);
						result = this.cache.filter({dos: 2});
						expect(result[0]).toEqual(foo);
						result = this.cache.filter({uno: 1, dos: 2});
						expect(result[0]).toEqual(foo);
						result = this.cache.filter({dos: 1});
						expect(result[0]).toEqual(undefined);
					});
				});
			});
		});
	};
	return {run: run};
});
