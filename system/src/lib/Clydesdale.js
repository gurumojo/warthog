define([

	'Horse'

], function(Horse){

	/**
	 * Create a Clydesdale object
	 *
	 * @augments
	 *  Horse
	 * @exports
	 *  Clydesdale
	 * @since
	 *  0.0.1
	 * @param
	 *  {string} name - customized reference
	 * @constructor
	 */
	var Clydesdale = function Clydesdale(name){
		this.name = name || 'horse';
		this.type = 'draught';
	};

	Clydesdale.prototype = new Horse();

	/**
	 * FUBAR
	 *
	 * @param
	 *  {string} bar - missing param
	 */
	Clydesdale.prototype.foo = function(){
		console.log('WTF?');
	};

	return Clydesdale;
});
