"use strict";
define([

	'underscore', 'Wrangler', 'Horse'

], function(_, Wrangler, Horse){

	describe('Wrangler', function(){
		it('exports a Wrangler constructor', function(){
			expect(typeof Wrangler).toBe('function');
		});
		describe('constructor', function(){
			beforeEach(function(){
				this.wrangler = new Wrangler({name: 'example'});
			});
			it('sets optional properties', function(){
				expect(typeof this.wrangler.name).toBe('string');
				expect(this.wrangler.name).toBe('example');
			});
			it('returns {Wrangler} new instance', function(){
				expect(typeof this.wrangler).toBe('object');
				expect(this.wrangler instanceof Wrangler).toEqual(true);
			});
		});
		describe('member', function(){
			beforeEach(function(){
				this.wrangler = new Wrangler();
			});
			describe('age', function(){
				it('has a {number} length of existence', function(){
					expect(_.isNumber(this.wrangler.age)).toEqual(true);
				});
			});
			describe('genus', function(){
				it('has a {string} genus name', function(){
					expect(_.isString(this.wrangler.genus)).toEqual(true);
				});
			});
			describe('species', function(){
				it('has a {string} species name', function(){
					expect(_.isString(this.wrangler.species)).toEqual(true);
				});
			});
			describe('weight', function(){
				it('has a {number} relative mass', function(){
					expect(_.isNumber(this.wrangler.weight)).toEqual(true);
				});
			});
		});
		describe('method', function(){
			beforeEach(function(){
				this.wrangler = new Wrangler();
			});
			describe('drink', function(){
				it('returns {boolean} success indicator', function(){
					expect(typeof this.wrangler.drink()).toBe('boolean');
				});
			});
			describe('feed', function(){
				it('returns {boolean} success indicator', function(){
					expect(typeof this.wrangler.feed()).toBe('boolean');
				});
			});
			describe('mate', function(){
				it('returns {boolean} success indicator', function(){
					expect(typeof this.wrangler.mate()).toBe('boolean');
				});
			});
			describe('wash', function(){
				it('returns {boolean} success indicator', function(){
					expect(typeof this.wrangler.wash()).toBe('boolean');
				});
			});
			describe('break', function(){
				beforeEach(function(){
					this.horse = new Horse();
				});
				it('accepts a Horse for the first parameter', function(){
					expect(this.wrangler.break).toThrow(new TypeError('Horse parameter required'));
					expect(this.wrangler.break(this.horse)).toEqual(true);
				});
				it('returns {boolean} success indicator', function(){
					expect(typeof this.wrangler.break(this.horse)).toBe('boolean');
				});
			});
			describe('ride', function(){
				beforeEach(function(){
					this.horse = new Horse();
				});
				it('accepts a Horse for the first parameter', function(){
					expect(this.wrangler.ride).toThrow(new TypeError('Horse parameter required'));
					expect(this.wrangler.ride(this.horse)).toEqual(true);
				});
				it('returns {boolean} success indicator', function(){
					expect(typeof this.wrangler.ride(this.horse)).toBe('boolean');
				});
			});
		});
	});
});
