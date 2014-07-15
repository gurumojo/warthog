/**
 * @summary
 *  Horse Module
 * @since 0.0.1
 * @requires {@link module:Mammal Mammal}
 * @module Horse
 * @description
 *  This module returns a constructor of type Horse, an augmented
 *  Mammal type.
 */
define([

	'pattern/Mammal'

], function(Mammal){

	/**
	 * @summary
	 *  Horse Constructor
	 * @since 0.0.1
	 * @augments Mammal
	 * @classdesc Horse.prototype
	 * @function Horse
	 * @param
	 *  {string} name - customized reference
	 * @constructor
	 */
	function Horse(name){
		this.name = name || 'Mr. Ed';
	}

	Horse.prototype = new Mammal();

	/**
	 * Whinny
	 */
	Horse.whinny = function(){
		console.log('Neigh!');
	};

	/**
	 * Run
	 */
	Horse.prototype.run = function(){
		console.log('Running...');
	};

	/**
	 * Horse Module
	 */
	var horse = Object.create(Mammal.prototype, {
		member: {
			get: function(){ return this.member; },
			set: function(value){ this.member = value; }
		}
	});

	return Horse;
});
