"use strict";
define([

	'underscore', 'Appaloosa'

], function(_, Appaloosa){

	function run(){
		describe('Appaloosa', function(){
			it('exports a Appaloosa constructor', function(){
				expect(typeof Appaloosa).toBe('function');
			});
			describe('constructor', function(){
				beforeEach(function(){
					this.appaloosa = new Appaloosa('example');
				});
				it('sets name property', function(){
					expect(typeof this.appaloosa.name).toBe('string');
					expect(this.appaloosa.name).toBe('example');
				});
				it('returns {Appaloosa} new instance', function(){
					expect(typeof this.appaloosa).toBe('object');
					expect(this.appaloosa instanceof Appaloosa).toEqual(true);
				});
			});
			describe('member', function(){
				beforeEach(function(){
					this.appaloosa = new Appaloosa();
				});
				describe('age', function(){
					it('has a {number} length of existence', function(){
						expect(_.isNumber(this.appaloosa.age)).toEqual(true);
					});
				});
				describe('genus', function(){
					it('has a {string} genus name', function(){
						expect(_.isString(this.appaloosa.genus)).toEqual(true);
					});
				});
				describe('species', function(){
					it('has a {string} species name', function(){
						expect(_.isString(this.appaloosa.species)).toEqual(true);
					});
				});
				describe('weight', function(){
					it('has a {number} relative mass', function(){
						expect(_.isNumber(this.appaloosa.weight)).toEqual(true);
					});
				});
			});
			describe('method', function(){
				beforeEach(function(){
					this.appaloosa = new Appaloosa();
				});
				describe('drink', function(){
					it('returns {boolean} success indicator', function(){
						expect(typeof this.appaloosa.drink()).toBe('boolean');
					});
				});
				describe('feed', function(){
					it('returns {boolean} success indicator', function(){
						expect(typeof this.appaloosa.feed()).toBe('boolean');
					});
				});
				describe('run', function(){
					it('logs to console', function(){
						spyOn(console, 'log');
						this.appaloosa.run();
						expect(console.log).toHaveBeenCalled();
					});
					it('returns {undefined}', function(){
						expect(typeof this.appaloosa.run()).toBe('undefined');
					});
				});
				describe('foo', function(){
					it('logs to console', function(){
						spyOn(console, 'log');
						this.appaloosa.foo();
						expect(console.log).toHaveBeenCalledWith('FUBAR');
						Appaloosa.foo();
						expect(console.log).toHaveBeenCalledWith('FOO');
					});
					it('returns {undefined}', function(){
						expect(typeof this.appaloosa.run()).toBe('undefined');
					});
				});
			});
		});
	};
	return {run: run};
});
