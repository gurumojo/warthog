"use strict";
define([

	'underscore', 'Clydesdale'

], function(_, Clydesdale){

	describe('Clydesdale', function(){
		it('exports a Clydesdale constructor', function(){
			expect(typeof Clydesdale).toBe('function');
		});
		describe('constructor', function(){
			beforeEach(function(){
				this.clydesdale = new Clydesdale('example');
			});
			it('sets name property', function(){
				expect(typeof this.clydesdale.name).toBe('string');
				expect(this.clydesdale.name).toBe('example');
			});
			it('returns {Clydesdale} new instance', function(){
				expect(typeof this.clydesdale).toBe('object');
				expect(this.clydesdale instanceof Clydesdale).toEqual(true);
			});
		});
		describe('member', function(){
			beforeEach(function(){
				this.clydesdale = new Clydesdale();
			});
			describe('age', function(){
				it('has a {number} length of existence', function(){
					expect(_.isNumber(this.clydesdale.age)).toEqual(true);
				});
			});
			describe('genus', function(){
				it('has a {string} genus name', function(){
					expect(_.isString(this.clydesdale.genus)).toEqual(true);
				});
			});
			describe('species', function(){
				it('has a {string} species name', function(){
					expect(_.isString(this.clydesdale.species)).toEqual(true);
				});
			});
			describe('weight', function(){
				it('has a {number} relative mass', function(){
					expect(_.isNumber(this.clydesdale.weight)).toEqual(true);
				});
			});
		});
		describe('method', function(){
			beforeEach(function(){
				this.clydesdale = new Clydesdale();
			});
			describe('drink', function(){
				it('returns {boolean} success indicator', function(){
					expect(typeof this.clydesdale.drink()).toBe('boolean');
				});
			});
			describe('feed', function(){
				it('returns {boolean} success indicator', function(){
					expect(typeof this.clydesdale.feed()).toBe('boolean');
				});
			});
			describe('run', function(){
				it('logs to console', function(){
					spyOn(console, 'log');
					this.clydesdale.run();
					expect(console.log).toHaveBeenCalled();
				});
				it('returns {undefined}', function(){
					expect(typeof this.clydesdale.run()).toBe('undefined');
				});
			});
			describe('foo', function(){
				it('logs to console', function(){
					spyOn(console, 'log');
					this.clydesdale.foo();
					expect(console.log).toHaveBeenCalledWith('WTF?');
				});
				it('returns {undefined}', function(){
					expect(typeof this.clydesdale.foo()).toBe('undefined');
				});
			});
		});
	});
});
