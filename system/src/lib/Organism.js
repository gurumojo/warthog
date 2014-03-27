define([

	'underscore'

], function(_){

	/**
	 * @summary
	 *  Create a new object with supplied attributes
	 * @exports
	 *  Organism
	 * @since
	 *  0.0.1
	 * @constructor
	 * @param
	 *  {object} option - enumerated static properties
	 */
	function Organism(option){
		_.each(option, function(value, key){
			this[key] = value;
		}, this);
	}

	Organism.prototype = {

		/**
		 * length of existence
		 * @type {number}
		 */
		age: 0,

		/**
		 * binomial nomenclature - first part
		 * @type {string}
		 */
		genus: '',

		/**
		 * binomial nomenclature - second part
		 * @type {string}
		 */
		species: '',

		/**
		 * relative mass
		 * @type {number}
		 */
		weight: 0

	};

	return Organism;
});
