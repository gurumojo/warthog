define([

	'underscore', 'Cache', 'Horse'

], function(_, Cache, Horse){

	/**
	 * @summary
	 *  Pasture Constructor
	 * @requires
	 *  {@link http://underscorejs.org/ underscore}
	 * @requires
	 *  {@link Horse}
	 * @augments
	 *  Cache
	 * @classdesc
	 *  Pasture.prototype
	 * @exports
	 *  Pasture
	 * @since
	 *  0.0.1
	 * @description
	 *  This module returns a constructor of type Pasture, a collection
	 *  manager for Horse objects which extends Cache.
	 * @constructor
	 */
	function Pasture(){
		this.cache = {};
	}

	Pasture.prototype = {

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
			if(!value instanceof Horse){
				throw new TypeError('Horse parameter required');
			}
			this.cache[member] = value;
			return this.cache[member];
		}

	};

	_.defaults(Pasture.prototype, Cache.prototype);

	return Pasture;
});
