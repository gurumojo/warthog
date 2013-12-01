/**
 * Example Constructor
 */
define(['underscore'], function(_){

	/**
	 * Create a new object with supplied attributes
	 *
	 * @exports Example
	 * @version 0.0
	 * @constructor
	 * @param {object} option enumerated static properties
	 */
	var example = function Example(option){
		_.each(option, function(value, key){
			this[key] = value;
		}, this);
	};

	example.prototype = {

		/** binomial nomenclature - first part */
		genus: null,

		/** binomial nomenclature - second part */
		species: null,

		/**
		 * Get specific object members
		 *
		 * @param {object} option property query hash
		 * @return {array} member object collection
		 */
		search: function(option){
			return _.where(this, option);
		}
	};

	return example;
});
