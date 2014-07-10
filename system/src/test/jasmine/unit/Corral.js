"use strict";
define([

	'underscore', 'Corral', 'Horse'

], function(_, Corral, Horse){

	describe('Corral', function(){
		it('exports a Corral constructor', function(){
			expect(typeof Corral).toBe('function');
		});
		describe('constructor', function(){
			it('returns {Corral} new instance', function(){
				var corral = new Corral();
				expect(typeof corral).toBe('object');
				expect(corral instanceof Corral).toEqual(true);
			});
		});
		describe('member', function(){
			describe('n/a', function(){
				var corral = new Corral();
				it('zero instance members', function(){
					var member = !_.every(corral, _.isFunction);
					expect(member).toEqual(false);
				});
			});
		});
		describe('method', function(){
			beforeEach(function(){
				this.corral = new Corral();
				this.horse = new Horse();
			});
			describe('clean', function(){
				it('inherits clean via prototype', function(){
					expect(typeof this.corral.clean).toBe('function');
					expect(_.has(this.corral, 'clean')).toEqual(false);
				});
			});
			describe('get', function(){
				it('inherits get via prototype', function(){
					expect(typeof this.corral.get).toBe('function');
					expect(_.has(this.corral, 'get')).toEqual(false);
				});
			});
			describe('filter', function(){
				it('inherits filter via prototype', function(){
					expect(typeof this.corral.filter).toBe('function');
					expect(_.has(this.corral, 'filter')).toEqual(false);
				});
			});
			describe('set', function(){
				it('accepts a string for the first parameter', function(){
					var text = 'foo';
					expect(this.corral.set).toThrow(new TypeError('string parameter required'));
					expect(this.corral.set(text, this.horse)).toBe(this.horse);
					expect(typeof text).toBe('string');
				});
				it('accepts a Horse for the second parameter', function(){
					expect(this.horse instanceof Horse).toEqual(true);
					expect(this.corral.set('foo', this.horse)).toBe(this.horse);
				});
				it('returns {*} property value', function(){
					expect(this.corral.set('foo', this.horse)).toBe(this.horse);
				});
			});
		});
	});
});
