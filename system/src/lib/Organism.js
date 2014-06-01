/**
 * @summary
 *  Organism Module
 * @since 0.0.1
 * @requires {@link http://underscorejs.org/ underscore}
 * @module Organism
 * @description
 *  This module returns a constructor of type {@link Organism}.
 */
define([

	'underscore'

], function(_){

	/**
	 * @summary
	 *  Organism Constructor
	 * @since 0.0.1
	 * @classdesc Organism.prototype
	 * @function Organism
	 * @param
	 *  {object} option - enumerated instance properties
	 * @description
	 *  Create a new object with supplied attributes.
	 * @constructor
	 */
	function Organism(option){
		_.each(option, function(value, key){
			this[key] = value;
		}, this);
	}

	Organism.prototype = {

		/**
		 * length of existence
		 * @memberof Organism
		 * @type {number}
		 */
		age: 0,

		/**
		 * binomial nomenclature - first part
		 * @memberof Organism
		 * @type {string}
		 */
		genus: '',

		/**
		 * binomial nomenclature - second part
		 * @memberof Organism
		 * @type {string}
		 */
		species: '',

		/**
		 * relative mass
		 * @memberof Organism
		 * @type {number}
		 */
		weight: 0

	};

	return Organism;
});
