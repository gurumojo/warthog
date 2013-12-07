/**
 * Horse Constructor
 *
 */
define(['animal'], function(Animal){

	/**
	 * Create a Horse object
	 *
	 * @augments Animal
	 * @exports Horse
	 * @version 0.0
	 * @constructor
	 * @param {string} name - customized reference
	 */
	var Horse = function Horse(name){
		this.name = name || 'horse';
		this.type = 'mammal';
	};

	Horse.prototype = new Animal();

	/**
	 * FUBAR
	 *
	 * @param {string} name - customized reference
	 */
	Horse.foo = function(name){
		console.log('WTF?');
	};

	/**
	 * FUBAR
	 *
	 * @param {string} name - customized reference
	 */
	Horse.prototype.bar = function(name){
		console.log('WTF?');
	};

	/**
	 * Horse Module
	 */
	var horse = Object.create(Animal.prototype, {
		member: {
			get: function(){ return this.member; },
			set: function(value){ this.member = value; }
		}
	});

	return Horse;
});
