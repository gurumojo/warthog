/**
 * Organism Constructor
 */
define(['underscore'], function(_){

	/**
	 * Create a new object with supplied attributes
	 *
	 * @exports Organism
	 * @version 0.0
	 * @constructor
	 * @param {object} option enumerated static properties
	 */
	var organism = function Organism(option){
		_.each(option, function(value, key){
			this[key] = value;
		}, this);
	};

	organism.prototype = {

		/** binomial nomenclature - first part */
		genus: null,

		/** binomial nomenclature - second part */
		species: null,

		/**
		 * Get specific object members
		 *
		 * @param {object} option property query hash
		 * @return {object}
		 */
		search: function(option){
			return _.where(this, option);
		}
	};

	return organism;
});
