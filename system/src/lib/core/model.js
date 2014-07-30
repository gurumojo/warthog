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
	 *  revisions. To access the history of a particular member, pass
	 *  a truthy value as the optional second parameter to get().
	 * @constructor
	 */
	function Model(option){
		var memento = {};
		var state = {};
		Object.defineProperty(this, 'get', {
			/**
			 * @summary
			 *  Get Member Property
			 * @function
			 *  core/model.Model#get
			 * @param
			 *  {string} key - instance member name
			 * @param
			 *  {boolean} [history] - include all versions
			 * @return
			 *  {*} instance member property
			 */
			value: function get(key, history){
				return (history ? memento[key] : state[key]);
			},
			writable: false
		});
		Object.defineProperty(this, 'set', {
			/**
			 * @summary
			 *  Set Member Property
			 * @function
			 *  core/model.Model#set
			 * @param
			 *  {string} key - instance member name
			 * @param
			 *  {*} value - instance member property
			 * @return
			 *  {*} instance member property
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
		// Function.prototype.bind not supported in PhantomJS < v2
		//create = create.bind(this);
		//for(var x in option){
		//	create(option[x], x);
		//}
		_.each(option, _.bind(create, this));
	}

	Model.prototype = { constructor: Model };

	return Model;
});
