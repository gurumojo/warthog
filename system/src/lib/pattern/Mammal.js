/**
 * @summary
 *  Mammal Module
 * @since 0.0.1
 * @requires {@link module:Organism Organism}
 * @module Mammal
 * @description
 *  This module returns a constructor of type Mammal, an augmented
 *  Organism type.
 */
define([

	'pattern/Organism'

], function(Organism){

	/**
	 * @summary
	 *  Mammal Constructor
	 * @since 0.0.1
	 * @augments Organism
	 * @classdesc Mammal.prototype
	 * @function Mammal
	 * @param
	 *  {object} option - enumerated instance properties
	 * @description
	 *  Create a new object with supplied attributes.
	 * @constructor
	 */
	function Mammal(option){
		Organism.call(this, option);
	}

	Mammal.prototype = new Organism();

	/**
	 * @summary
	 *  Drink
	 * @memberof Mammal
	 * @return
	 *  {boolean} success
	 */
	Mammal.prototype.drink = function(){
		return true;
	};

	/**
	 * @summary
	 *  Feed
	 * @memberof Mammal
	 * @return
	 *  {boolean} success
	 */
	Mammal.prototype.feed = function(){
		return true;
	};

	return Mammal;
});
