define([

	'underscore', 'Cache', 'Horse'

], function(_, Cache, Horse){

	/**
	 * @summary
	 *  Corral Constructor
	 * @requires
	 *  {@link http://underscorejs.org/ underscore}
	 * @requires
	 *  {@link Horse}
	 * @augments
	 *  Cache
	 * @classdesc
	 *  Corral.prototype
	 * @exports
	 *  Corral
	 * @since
	 *  0.0.1
	 * @description
	 *  This module returns a constructor of type Corral, a collection
	 *  manager for Horse objects which augments Cache.
	 * @constructor
	 */
	function Corral(){}

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
		 * @param
		 *  {string} member - object attribute descriptor
		 * @param
		 *  {Horse} value - object attribute modification
		 * @return
		 *  {Horse} value
		 * @description
		 *  Set object member values by name
		 */
		set: function(member, value){
			if(typeof member !== 'string'){
				throw new TypeError('string parameter required');
			}
			if(!(value instanceof Horse)){
				throw new TypeError('Horse parameter required');
			}
			storage[member] = value;
			return storage[member];
		}

	};

	_.defaults(Corral.prototype, Cache.prototype);

	return Corral;
});
