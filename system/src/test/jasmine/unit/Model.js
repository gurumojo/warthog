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
				expect(this.model instanceof Model).toBe(true);
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
				it('returns {*} specific instance properties', function(){
					expect(this.model.get('name')).toBe('example');
				});
				it('returns {array} specific instance property revisions', function(){
					var result = this.model.get('name', true);
					expect(_.isArray(result)).toBe(true);
					expect(result.length).toBe(1);
					expect(_.has(result[0], 'state')).toBe(true);
					expect(_.has(result[0], 'timestamp')).toBe(true);
				});
				it('returns {object} a collection of instance properties', function(){
					expect(typeof this.model.get()).toBe('object');
					expect(this.model.get().name).toBe('example');
				});
				it('returns {object} a collection of instance property revision arrays', function(){
					var result = this.model.get(null, true);
					expect(_.isArray(result.name)).toBe(true);
					expect(result.name.length).toBe(1);
					expect(_.has(result.name[0], 'state')).toBe(true);
					expect(_.has(result.name[0], 'timestamp')).toBe(true);
				});
				it('excludes instance properties created by direct assignment', function(){
					expect(this.model.property).toBe(undefined);
					this.model.property = 'example';
					expect(this.model.get('property')).toBe(undefined);
					expect(this.model.get().property).toBe(undefined);
					expect(this.model.property).toBe('example');
				});
				it('excludes instance properties by key not matching RegExp', function(){
					var set = this.model.set('test', 'schnazzy');
					var get = this.model.get();
					var regex = this.model.get(/test/);
					expect(set).toBe('schnazzy');
					expect(_.size(get)).toBe(2);
					expect(_.size(regex)).toBe(1);
				});
				it('excludes instance properties by value not matched by attributes', function(){
					var set = this.model.set('where', {foo: 'bar'});
					var get = this.model.get();
					var where = this.model.get({foo: 'bar'});
					expect(set).toEqual({foo: 'bar'});
					expect(_.size(get)).toBe(2);
					expect(_.size(where)).toBe(1);
				});
				it('excludes instance properties by property not matched by function', function(){
					var set = this.model.set('filter', {foo: 'bar'});
					var get = this.model.get();
					var filter = this.model.get(function(x){return x.foo === 'bar'});
					expect(set).toEqual({foo: 'bar'});
					expect(_.size(get)).toBe(2);
					expect(_.size(filter)).toBe(1);
				});
			});
			describe('set', function(){
				var key = 'name';
				var value = 'property';
				it('returns {*} assigned instance property values', function(){
					expect(this.model.set(key, value)).toBe(value);
					expect(this.model.get(key)).toBe(value);
				});
				it('creates instance members which may not be deleted', function(){
					expect(this.model.name).toBe('example');
					expect(function(){ delete this.model.name }).toThrow();
					expect(this.model.name).toBe('example');
				});
				it('adds to the revision history of created instance members', function(){
					expect(this.model.get(key, true).length).toBe(1);
					expect(this.model.set(key, value)).toBe(value);
					expect(this.model.get(key, true).length).toBe(2);
					this.model[key] = key + value;
					var result = _.pluck(this.model.get('name', true), 'state');
					expect(result.length).toBe(3);
					expect(_.contains(result, 'example')).toBe(true);
					expect(_.contains(result, value)).toBe(true);
					expect(_.contains(result, key + value)).toBe(true);
				});
				it('does not add to the revision history of directly assigned instance members', function(){
					expect(this.model['property']).toBe(undefined);
					expect(this.model.get('property', true)).toBe(undefined);
					this.model['property'] = 'example';
					expect(this.model.property).toBe('example');
					expect(this.model.set('property', value)).toBe(value);
					expect(this.model.get('property', true)).toBe(undefined);
				});
			});
		});
	});
});
