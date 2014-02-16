define([

	'Mammal'

], function(Mammal){

	/**
	 * Create a Horse object
	 *
	 * @augments
	 *  Mammal
	 * @exports
	 *  Horse
	 * @since
	 *  0.0.1
	 * @param
	 *  {string} name - customized reference
	 * @constructor
	 */
	var Horse = function Horse(name){
		this.name = name || 'Mr. Ed';
	};

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
