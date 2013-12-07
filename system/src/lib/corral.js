/**
 * Corral Module
 */
define(['underscore'], function(_){

	/**
	 * A collection of Horse objects
	 *
	 * @exports corral
	 * @version 0.0
	 */
	var corral = {

		/**
		 * Purge all object member values
		 *
		 * @return {boolean}
		 */
		clean: function(){
			return _.isEmpty(cache = {});
		},

		/**
		 * Get object member values by name
		 *
		 * @param {string} member - object attribute descriptor
		 * @return {mixed}
		 */
		get: function(member){
			return cache[member];
		},

		/**
		 * Set object member values by name
		 *
		 * @param {string} member - object attribute descriptor
		 * @param {mixed} value - object attribute modification
		 * @return {mixed}
		 */
		set: function(member, value){
			cache[member] = value;
			return cache[member];
		},

		/**
		 * Get the size of the Horse collection
		 *
		 * @return {number}
		 */
		size: function(){
			return _.size(_.compact(cache));
		}
	};

	/**
	 * Private object reference storage
	 */
	var cache = {};

	return corral;
});
