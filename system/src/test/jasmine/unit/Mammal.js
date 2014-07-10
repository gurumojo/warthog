"use strict";
define([

	'underscore', 'Mammal'

], function(_, Mammal){

	describe('Mammal', function(){
		it('exports an Mammal constructor', function(){
			expect(typeof Mammal).toBe('function');
		});
		describe('constructor', function(){
			beforeEach(function(){
				this.mammal = new Mammal({name: 'example'});
			});
			it('sets optional properties', function(){
				expect(typeof this.mammal.name).toBe('string');
				expect(this.mammal.name).toBe('example');
			});
			it('returns {Mammal} new instance', function(){
				expect(typeof this.mammal).toBe('object');
				expect(this.mammal instanceof Mammal).toEqual(true);
			});
		});
		describe('member', function(){
			beforeEach(function(){
				this.mammal = new Mammal();
			});
			describe('age', function(){
				it('has a {number} length of existence', function(){
					expect(_.isNumber(this.mammal.age)).toEqual(true);
				});
			});
			describe('genus', function(){
				it('has a {string} genus name', function(){
					expect(_.isString(this.mammal.genus)).toEqual(true);
				});
			});
			describe('species', function(){
				it('has a {string} species name', function(){
					expect(_.isString(this.mammal.species)).toEqual(true);
				});
			});
			describe('weight', function(){
				it('has a {number} relative mass', function(){
					expect(_.isNumber(this.mammal.weight)).toEqual(true);
				});
			});
		});
		describe('method', function(){
			beforeEach(function(){
				this.mammal = new Mammal();
			});
			describe('drink', function(){
				it('returns {boolean} success indicator', function(){
					expect(typeof this.mammal.drink()).toBe('boolean');
				});
			});
			describe('feed', function(){
				it('returns {boolean} success indicator', function(){
					expect(typeof this.mammal.feed()).toBe('boolean');
				});
			});
		});
	});
});
