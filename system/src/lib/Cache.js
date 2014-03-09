define([

	'underscore',

], function(_){

	/**
	 * @summary
	 *  Cache Constructor
	 * @requires
	 *  {@link http://underscorejs.org/ underscore}
	 * @classdesc
	 *  Cache.prototype
	 * @exports
	 *  Cache
	 * @since
	 *  0.0.2
	 * @description
	 *  This module returns a constructor of type Cache, a general
	 *  private collection manager with accessor and mutator methods.
	 * @constructor
	 */
	function Cache(){}

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
		 * @return
		 *  {boolean} success
		 * @description
		 *  Purge all object members
		 */
		clean: function(){
			//return _.isEmpty(this.cache = {});
			return _.isEmpty(storage = {});
		},

		/**
		 * @summary
		 *  Count Value Cache
		 * @return
		 *  {number} size
		 * @description
		 *  Get the size of the object collection
		 */
		count: function(){
			//return _.size(this.cache);
			return _.size(storage);
		},

		/**
		 * @summary
		 *  Get Member Values
		 * @since
		 *  0.0.1
		 * @param
		 *  {(string|string[])} key - instance member reference(s)
		 * @return
		 *  {array} instance member value(s)
		 * @description
		 *  Return the cache object value(s) for the supplied key(s).
		 *  The key parameter may be a string or an array of strings.
		 */
		get: function(key){
			//return _.values(_.pick(this.cache, key));
			return _.values(_.pick(storage, key));
		},

		/**
		 * @summary
		 *  Set Member Values
		 * @since
		 *  0.0.1
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
			//this.cache[key] = value;
			//return this.cache[key];
			storage[key] = value;
			return storage[key];
		},

		/**
		 * @summary
		 *  Filter Member Values
		 * @since
		 *  0.0.2
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
			//return _.where(this.cache, option);
			return _.where(storage, option);
		}
	};

	return Cache;
});
