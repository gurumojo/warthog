/**
 * Appaloosa Constructor
 */
define(['horse'], function(Horse){

	/**
	 * Create an Appaloosa object
	 *
	 * @augments Horse
	 * @exports Appaloosa
	 * @version 0.0
	 * @constructor
	 * @param {string} name - customized reference
	 */
	var Appaloosa = function Appaloosa(name){
		this.name = name || 'horse';
		this.type = 'mammal';
	};

	/**
	 * FUBAR
	 *
	 * @param {string} name - customized reference
	 */
	Appaloosa.prototype.foo = function(name){
		console.log('WTF?');
	};

	return Appaloosa;
});
