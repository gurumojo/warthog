"use strict";
define([

	'underscore', 'Pasture', 'Horse'

], function(_, Pasture, Horse){

	function run(){
		describe('Pasture', function(){
			it('exports a Pasture constructor', function(){
				expect(typeof Pasture).toBe('function');
			});
			describe('constructor', function(){
				it('returns {Pasture} pasture instance', function(){
					var pasture = new Pasture();
					expect(typeof pasture).toBe('object');
					expect(pasture instanceof Pasture).toEqual(true);
				});
			});
			describe('member', function(){
				describe('n/a', function(){
					var pasture = new Pasture();
					it('zero instance members', function(){
						var member = !_.every(pasture, _.isFunction);
						expect(member).toEqual(false);
					});
				});
			});
			describe('method', function(){
				beforeEach(function(){
					this.pasture = new Pasture();
					this.horse = new Horse();
				});
				describe('clean', function(){
					it('inherits clean via prototype', function(){
						expect(typeof this.pasture.clean).toBe('function');
						expect(_.has(this.pasture, 'clean')).toEqual(false);
					});
				});
				describe('get', function(){
					it('inherits get via prototype', function(){
						expect(typeof this.pasture.get).toBe('function');
						expect(_.has(this.pasture, 'get')).toEqual(false);
					});
				});
				describe('filter', function(){
					it('inherits filter via prototype', function(){
						expect(typeof this.pasture.filter).toBe('function');
						expect(_.has(this.pasture, 'filter')).toEqual(false);
					});
				});
				describe('set', function(){
					it('accepts a string for the first parameter', function(){
						var text = 'foo';
						expect(this.pasture.set).toThrow('string parameter required');
						expect(this.pasture.set(text, this.horse)).toBe(this.horse);
						expect(typeof text).toBe('string');
					});
					it('accepts a Horse for the second parameter', function(){
						expect(this.horse instanceof Horse).toEqual(true);
						expect(this.pasture.set('foo', this.horse)).toBe(this.horse);
					});
					it('returns {*} pasture property value', function(){
						expect(this.pasture.set('foo', this.horse)).toBe(this.horse);
					});
				});
			});
		});
	};
	return {run: run};
});
