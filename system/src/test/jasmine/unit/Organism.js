"use strict";
define([

	'underscore', 'Organism'

], function(_, Organism){

	describe('Organism', function(){
		it('exports an Organism constructor', function(){
			expect(typeof Organism).toBe('function');
		});
		describe('constructor', function(){
			beforeEach(function(){
				this.organism = new Organism({name: 'example'});
			});
			it('sets optional properties', function(){
				expect(typeof this.organism.name).toBe('string');
				expect(this.organism.name).toBe('example');
			});
			it('returns {Organism} new instance', function(){
				expect(typeof this.organism).toBe('object');
				expect(this.organism instanceof Organism).toEqual(true);
			});
		});
		describe('member', function(){
			beforeEach(function(){
				this.organism = new Organism();
			});
			describe('age', function(){
				it('has a {number} length of existence', function(){
					expect(_.isNumber(this.organism.age)).toEqual(true);
				});
			});
			describe('genus', function(){
				it('has a {string} genus name', function(){
					expect(_.isString(this.organism.genus)).toEqual(true);
				});
			});
			describe('species', function(){
				it('has a {string} species name', function(){
					expect(_.isString(this.organism.species)).toEqual(true);
				});
			});
			describe('weight', function(){
				it('has a {number} relative mass', function(){
					expect(_.isNumber(this.organism.weight)).toEqual(true);
				});
			});
		});
		describe('method', function(){
			describe('n/a', function(){
				it('zero instance methods', function(){
					var organism = new Organism();
					expect(_.every(organism, !_.isFunction)).toEqual(true);
				});
			});
		});
	});
});
