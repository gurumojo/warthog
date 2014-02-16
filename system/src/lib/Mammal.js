define([

	'Organism'

], function(Organism){

	/**
	 * @summary
	 *  Mammal Constructor
	 * @augments
	 *  Organism
	 * @classdesc
	 *  Mammal.prototype
	 * @exports
	 *  Mammal
	 * @since
	 *  0.0.1
	 * @param
	 *  {object} option - enumerated instance properties
	 * @description
	 *  This module returns a constructor of type Mammal, an augmented
	 *  Organism type.
	 * @constructor
	 */
	var Mammal = function Mammal(option){
		Organism.call(this, option);
	};

	/**
	 * @summary
	 *  Drink
	 * @return
	 *  {boolean} success
	 */
	Mammal.prototype.drink = function(){
		return true;
	};

	/**
	 * @summary
	 *  Feed
	 * @return
	 *  {boolean} success
	 */
	Mammal.prototype.feed = function(){
		return true;
	};

	return Mammal;
});
