/**
 * @summary
 *  Model Module
 * @since 0.2.0
 * @namespace core/model
 * @description
 *  This module provides a base model constructor and prototype.
 */
define([

	'underscore'

], function(_){

	/**
	 * @summary
	 *  Model Constructor
	 * @since 0.2.0
	 * @function core/model.Model
	 * @param
	 *  {object} option - instance property assignments
	 * @description
	 *  Create a new Model instance with passed in member properties.
	 *  Each member created during construction collects its own value
	 *  history in a private cache. The same is true of members added
	 *  to an instance after construction when using the set() method,
	 *  but object members created via direct assignment do not track
	 *  revisions.
	 * @constructor
	 */
	function Model(option){
		var memento = {};
		var state = {};
		Object.defineProperty(this, 'get', {
			/**
			 * @summary
			 *  Get Property
			 * @function
			 *  core/model.Model#get
			 * @param
			 *  {(function|object|string|regex)} key - instance property search
			 * @param
			 *  {boolean} [history] - return {array} state revisions
			 * @returns
			 *  {*} instance property content
			 * @description
			 *  This method does much more than grab values identified by string
			 *  arguments to the key parameter. A falsey first argument returns
			 *  the entire model state (excluding any keys created via direct
			 *  assignment). To exclude return values from collection access pass
			 *  a function to filter properties, an object where all key:value
			 *  pairs match attributes of items returned, or a RegExp instance
			 *  matching on property keys. To access the history of a particular
			 *  member or collection include an optional truthy second argument.
			 * @todo
			 *  determine need for _.clone usage
			 */
			value: function get(key, history){
				var selection, storage = history ? memento : state;
				switch(typeof key){
					case 'string':
						selection = storage[key];
						break;
					case 'object':
						if(key instanceof RegExp){
							selection = _.filter(storage, function(value, name){
								return key.test(name);
							});
						} else if(_.isNull(key)){
							selection = storage;
						} else {
							selection = _.where(storage, key);
						}
						break;
					case 'function':
						selection = _.filter(storage, key);
						break;
					default:
						selection = key ? storage[key] : storage;
				}
				return selection;
			},
			writable: false
		});
		Object.defineProperty(this, 'set', {
			/**
			 * @summary
			 *  Set Property
			 * @function
			 *  core/model.Model#set
			 * @param
			 *  {string} key - instance property name
			 * @param
			 *  {*} value - instance property content
			 * @returns
			 *  {*} instance property content
			 * @description
			 *  Create instance properties which track their own revision history
			 *  and may not be deleted (though they may be assigned `undefined`).
			 *  Instance properties created via direct assignemnt will not
			 *  inherit this behavior.
			 */
			value: function set(key, value){
				return this.hasOwnProperty(key) ? (this[key] = value) : create(value, key);
			},
			writable: false
		});
		function create(value, key){
			Object.defineProperty(this, key, {
				enumerable: true,
				get: function(){
					return state[key];
				},
				set: function(value){ 
					state[key] = value; 
					memento[key].push({state: value, timestamp: Date.now()}); 
				}
			});
			memento[key] = [];
			this[key] = value;
			return value;
		}
		_.each(option, _.bind(create, this));
	}

	Model.prototype = { constructor: Model };

	return Model;
});
