/**
 * Animal Constructor
 */
define(['organism'], function(Organism){

	/**
	 * Create a new object with supplied attributes
	 *
	 * @augments Organism
	 * @exports Animal
	 * @version 0.0
	 * @constructor
	 * @param {object} option enumerated static properties
	 */
	var animal = function Animal(option){
		Organism.call(this, option);
	};

	/**
	 * Get object member values by name
	 *
	 * @param {string} member object attribute descriptor
	 * @return {mixed}
	 */
	animal.prototype.get = function(member){
		return this[member];
	};

	/**
	 * Set object member values by name
	 *
	 * @param {string} member object attribute
	 * @param {mixed} value attribute modification
	 */
	animal.prototype.set = function(member, value){
		this[member] = value;
	};

	return animal;
});
