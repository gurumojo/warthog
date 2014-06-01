/**
 * @summary
 *  Pasture Module
 * @since 0.0.1
 * @requires {@link http://underscorejs.org/ underscore}
 * @requires {@link module:Cache Cache}
 * @requires {@link module:Horse Horse}
 * @module Pasture
 * @description
 *  This module returns a constructor of type {@link Pasture}, an
 *  augmented {@link Cache} type.
 */
define([

	'underscore', 'Cache', 'Horse'

], function(_, Cache, Horse){

	/**
	 * @summary
	 *  Pasture Constructor
	 * @since 0.0.1
	 * @augments Cache
	 * @classdesc Pasture.prototype
	 * @function Pasture
	 * @description
	 *  Create a new object of type Pasture, a collection manager for
	 *  Horse objects.
	 * @constructor
	 */
	function Pasture(){
		//this.storage = {};
	}

	/**
	 * @summary
	 *  Storage
	 * @description
	 *  A private collection hash.
	 */
	var storage = {};

	Pasture.prototype = {

		/**
		 * @summary
		 *  Setter
		 * @function Pasture#set
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

	_.defaults(Pasture.prototype, Cache.prototype);

	return Pasture;
});
