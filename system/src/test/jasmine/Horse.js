"use strict";
define([

	'underscore', 'Horse'

], function(_, Horse){

	function run(){
		describe('Horse', function(){
			it('exports a Horse constructor', function(){
				expect(typeof Horse).toBe('function');
			});
			describe('constructor', function(){
				beforeEach(function(){
					this.horse = new Horse('example');
				});
				it('sets name property', function(){
					expect(typeof this.horse.name).toBe('string');
					expect(this.horse.name).toBe('example');
				});
				it('returns {Horse} horse instance', function(){
					expect(typeof this.horse).toBe('object');
					expect(this.horse instanceof Horse).toEqual(true);
				});
			});
			describe('member', function(){
				beforeEach(function(){
					this.horse = new Horse();
				});
				describe('age', function(){
					it('has a {number} length of existence', function(){
						expect(_.isNumber(this.horse.age)).toEqual(true);
					});
				});
				describe('genus', function(){
					it('has a {string} genus name', function(){
						expect(_.isString(this.horse.genus)).toEqual(true);
					});
				});
				describe('species', function(){
					it('has a {string} species name', function(){
						expect(_.isString(this.horse.species)).toEqual(true);
					});
				});
				describe('weight', function(){
					it('has a {number} relative mass', function(){
						expect(_.isNumber(this.horse.weight)).toEqual(true);
					});
				});
			});
			describe('method', function(){
				beforeEach(function(){
					this.horse = new Horse();
				});
				describe('drink', function(){
					it('returns {boolean} success indicator', function(){
						expect(typeof this.horse.drink()).toBe('boolean');
					});
				});
				describe('feed', function(){
					it('returns {boolean} success indicator', function(){
						expect(typeof this.horse.feed()).toBe('boolean');
					});
				});
				describe('whinny <static>', function(){
					it('logs to console', function(){
						spyOn(console, 'log');
						Horse.whinny();
						expect(console.log).toHaveBeenCalled();
					});
					it('returns {undefined}', function(){
						expect(typeof Horse.whinny()).toBe('undefined');
					});
				});
				describe('run', function(){
					it('logs to console', function(){
						spyOn(console, 'log');
						this.horse.run();
						expect(console.log).toHaveBeenCalled();
					});
					it('returns {undefined}', function(){
						expect(typeof this.horse.run()).toBe('undefined');
					});
				});
			});
		});
	};
	return {run: run};
});
