'use strict';
define([

	'underscore', 'core/model'

], function(_, Model){

	describe('Model', function(){
		it('exports a Model constructor', function(){
			expect(typeof Model).toBe('function');
		});
		describe('constructor', function(){
			beforeEach(function(){
				this.model = new Model({name: 'example'});
			});
			it('sets optional properties', function(){
				expect(typeof this.model.name).toBe('string');
				expect(this.model.name).toBe('example');
			});
			it('returns {Model} new instance', function(){
				expect(typeof this.model).toBe('object');
				expect(this.model instanceof Model).toEqual(true);
			});
		});
		describe('member', function(){
			beforeEach(function(){
				this.model = new Model();
			});
			describe('n/a', function(){
				it('zero instance members', function(){
					expect(_.size(_.keys(this.model))).toBe(0);
				});
			});
		});
		describe('method', function(){
			beforeEach(function(){
				this.model = new Model({name: 'example'});
			});
			describe('get', function(){
				it('returns {*} instance members', function(){
					expect(this.model.get('name')).toBe('example');
				});
			});
			describe('set', function(){
				it('returns {*} instance members', function(){
					var key = 'name';
					var value = 'property';
					expect(this.model.set(key, value)).toBe(value);
				});
			});
		});
	});
});
