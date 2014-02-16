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
	var Cache = function Cache(){
		this.cache = {};
	};

	Cache.prototype = {

		/**
		 * @summary
		 *  Cleaner
		 * @return
		 *  {boolean} success
		 * @description
		 *  Purge all object members
		 */
		clean: function(){
			return _.isEmpty(cache = {});
		},

		/**
		 * @summary
		 *  Counter
		 * @return
		 *  {number} size
		 * @description
		 *  Get the size of the object collection
		 */
		count: function(){
			return _.size(this.cache);
		},

		/**
		 * @summary
		 *  Getter
		 * @param
		 *  {string} member - object attribute descriptor
		 * @return
		 *  {object} value
		 * @description
		 *  Get object member values by name
		 */
		get: function(member){
			if(!this.cache[member]){
				throw new RangeError('member not found');
			}
			return this.cache[member];
		},

		/**
		 * @summary
		 *  Setter
		 * @param
		 *  {string} member - attribute descriptor
		 * @param
		 *  {object} value - attribute modification
		 * @return
		 *  {object} value
		 * @description
		 *  Set object member values by name
		 */
		set: function(member, value){
			if(typeof member !== 'string'){
				throw new TypeError('string parameter required');
			}
			this.cache[member] = value;
			return this.cache[member];
		}
	};

	return Cache;
});
