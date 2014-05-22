"use strict";
define([

	'underscore', 'Human'

], function(_, Human){

	function run(){
		describe('Human', function(){
			it('exports an Human constructor', function(){
				expect(typeof Human).toBe('function');
			});
			describe('constructor', function(){
				beforeEach(function(){
					this.human = new Human({name: 'example'});
				});
				it('sets optional properties', function(){
					expect(typeof this.human.name).toBe('string');
					expect(this.human.name).toBe('example');
				});
				it('returns {Human} new instance', function(){
					expect(typeof this.human).toBe('object');
					expect(this.human instanceof Human).toEqual(true);
				});
			});
			describe('member', function(){
				beforeEach(function(){
					this.human = new Human();
				});
				describe('age', function(){
					it('has a {number} length of existence', function(){
						expect(_.isNumber(this.human.age)).toEqual(true);
					});
				});
				describe('genus', function(){
					it('has a {string} genus name', function(){
						expect(_.isString(this.human.genus)).toEqual(true);
					});
				});
				describe('species', function(){
					it('has a {string} species name', function(){
						expect(_.isString(this.human.species)).toEqual(true);
					});
				});
				describe('weight', function(){
					it('has a {number} relative mass', function(){
						expect(_.isNumber(this.human.weight)).toEqual(true);
					});
				});
			});
			describe('method', function(){
				beforeEach(function(){
					this.human = new Human();
				});
				describe('drink', function(){
					it('returns {boolean} success indicator', function(){
						expect(typeof this.human.drink()).toBe('boolean');
					});
				});
				describe('feed', function(){
					it('returns {boolean} success indicator', function(){
						expect(typeof this.human.feed()).toBe('boolean');
					});
				});
				describe('mate', function(){
					it('returns {boolean} success indicator', function(){
						expect(typeof this.human.mate()).toBe('boolean');
					});
				});
				describe('wash', function(){
					it('returns {boolean} success indicator', function(){
						expect(typeof this.human.wash()).toBe('boolean');
					});
				});
			});
		});
	};
	return {run: run};
});
