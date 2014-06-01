/**
 * @summary
 *  Corral Module
 * @since 0.0.1
 * @requires {@link http://underscorejs.org/ underscore}
 * @requires {@link module:Cache Cache}
 * @requires {@link module:Horse Horse}
 * @module Corral
 * @description
 *  This module returns a constructor of type {@link Corral}, an
 *  augmented {@link Cache} type.
 */
define([

	'underscore', 'Cache', 'Horse'

], function(_, Cache, Horse){

	/**
	 * @summary
	 *  Corral Constructor
	 * @since 0.0.1
	 * @augments Cache
	 * @classdesc Corral.prototype
	 * @function Corral
	 * @description
	 *  Create a new object of type Corral, a collection manager for
	 *  Horse objects.
	 * @constructor
	 */
	function Corral(){
		//this.storage = {};
	}

	/**
	 * @summary
	 *  Storage
	 * @description
	 *  A private collection hash.
	 */
	var storage = {};

	Corral.prototype = {

		/**
		 * @summary
		 *  Setter
		 * @function Corral#set
		 * @param
		 *  {string} member - object attribute descriptor
		 * @param
		 *  {Horse} value - object attribute modification
		 * @return
		 *  {Horse} value
		 * @description
		 *  Set object member values by name
		 * @todo
		 *  Refactor from accessing global storage to this.storage.
		 */
		set: function(member, value){
			if(typeof member !== 'string'){
				throw new TypeError('string parameter required');
			}
			if(!(value instanceof Horse)){
				throw new TypeError('Horse parameter required');
			}
			//this.storage[key] = value;
			//return this.storage[key];
			storage[member] = value;
			return storage[member];
		}

	};

	_.defaults(Corral.prototype, Cache.prototype);

	return Corral;
});
