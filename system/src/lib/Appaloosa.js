define([

	'Horse'

], function(Horse){

	/**
	 * Create an Appaloosa object
	 *
	 * @augments
	 *  Horse
	 * @exports
	 *  Appaloosa
	 * @since
	 *  0.0.1
	 * @param
	 *  {string} name - customized reference
	 * @constructor
	 */
	function Appaloosa(name){
		this.name = name || 'horse';
		this.type = 'stock';
	}

	Appaloosa.prototype = Horse.prototype;

	/**
	 * FOO
	 */
	Appaloosa.foo = function(){
		console.log('FOO');
	};

	/**
	 * FUBAR
	 */
	Appaloosa.prototype.foo = function(name){
		console.log('FUBAR');
	};

	return Appaloosa;
});
