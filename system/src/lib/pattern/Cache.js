/**
 * @summary
 *  Cache Module
 * @since 0.0.2
 * @requires {@link http://underscorejs.org/ underscore}
 * @module Cache
 * @description
 *  This module returns a constructor of type {@link Cache}.
 */
define([

	'underscore',

], function(_){

	/**
	 * @summary
	 *  Cache Constructor
	 * @since 0.0.2
	 * @classdesc Cache.prototype
	 * @function Cache
	 * @description
	 *  Create a new private cache object.
	 * @todo
	 *  Refactor from accessing global storage to this.storage.
	 * @constructor
	 */
	function Cache(){
		//this.storage = {};
	}

	/**
	 * @summary
	 *  Storage
	 * @description
	 *  A private collection hash.
	 */
	var storage = {};

	Cache.prototype = {

		/**
		 * @summary
		 *  Clean Value Cache
		 * @since 0.0.1
		 * @function Cache#clean
		 * @return
		 *  {boolean} success
		 * @description
		 *  Purge all object members
		 */
		clean: function(){
			//return _.isEmpty(this.storage = {});
			return _.isEmpty(storage = {});
		},

		/**
		 * @summary
		 *  Count Value Cache
		 * @since 0.0.1
		 * @function Cache#count
		 * @return
		 *  {number} size
		 * @description
		 *  Get the size of the object collection
		 */
		count: function(){
			//return _.size(this.storage);
			return _.size(storage);
		},

		/**
		 * @summary
		 *  Get Member Values
		 * @since 0.0.1
		 * @function Cache#get
		 * @param
		 *  {(string|string[])} key - instance member reference(s)
		 * @return
		 *  {array} instance member value(s)
		 * @description
		 *  Return the cache object value(s) for the supplied key(s).
		 *  The key parameter may be a string or an array of strings.
		 */
		get: function(key){
			//return _.values(_.pick(this.storage, key));
			return _.values(_.pick(storage, key));
		},

		/**
		 * @summary
		 *  Set Member Values
		 * @since 0.0.1
		 * @function Cache#set
		 * @param
		 *  {string} key - instance member reference
		 * @param
		 *  {*} value - instance member assignment
		 * @return
		 *  {*} instance member value
		 * @description
		 *   Update the object property key with the supplied value.
		 */
		set: function(key, value){
			if(typeof key !== 'string'){
				throw new TypeError('string parameter required');
			}
			//this.storage[key] = value;
			//return this.storage[key];
			storage[key] = value;
			return storage[key];
		},

		/**
		 * @summary
		 *  Filter Member Values
		 * @since 0.0.2
		 * @function Cache#filter
		 * @param
		 *  {object} option - member key/value hash
		 * @return
		 *  {array} value collection
		 * @description
		 *  Find and return a collection of objects with properties
		 *  matching the supplied query object key/value pairs.
		 */
		filter: function(option){
			if(typeof option !== 'object'){
				throw new TypeError('object parameter required');
			}
			//return _.where(this.storage, option);
			return _.where(storage, option);
		}
	};

	return Cache;
});
