/**
 * Clydesdale Constructor
 */
define(['horse'], function(Horse){

	/**
	 * Create a Clydesdale object
	 *
	 * @augments Horse
	 * @exports Clydesdale
	 * @version 0.0
	 * @constructor
	 * @param {string} name - customized reference
	 */
	var Clydesdale = function Clydesdale(name){
		this.name = name || 'horse';
		this.type = 'mammal';
	};

	Clydesdale.prototype = new Horse();

	/**
	 * FUBAR
	 *
	 * @param {string} name - customized reference
	 */
	Clydesdale.prototype.foo = function(name){
		console.log('WTF?');
	};

	return Clydesdale;
});
