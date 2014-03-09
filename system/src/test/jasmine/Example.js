"use strict";
define([

	'Example'

], function(Example){

	function run(){
		describe('Example', function(){
			it('exports an Example constructor', function(){
				expect(typeof Example).toBe('function');
			});
			describe('constructor', function(){
				beforeEach(function(){
					this.example = new Example({name: 'example'});
				});
				it('sets optional properties', function(){
					expect(typeof this.example.name).toBe('string');
					expect(this.example.name).toBe('example');
				});
				it('returns {Example} example instance', function(){
					expect(typeof this.example).toBe('object');
					expect(this.example instanceof Example).toEqual(true);
				});
			});
			describe('member', function(){
				describe('*', function(){
					it('variable instance members', function(){
						var instance = new Example();
						var member = !_.every(instance, _.isFunction);
						expect(member).toEqual(false);
					});
				});
			});
			describe('method', function(){
				beforeEach(function(){
					this.example = new Example({name: 'example'});
				});
				describe('dump', function(){
					it('logs to console', function(){
						//expect(typeof this.example.dump).toBe('function');
					});
					it('returns {undefined}', function(){
						expect(typeof this.example.dump()).toBe('undefined');
					});
				});
			});
		});
	};
	return {run: run};
});
