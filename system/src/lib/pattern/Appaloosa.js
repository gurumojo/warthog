/**
 * @summary
 *  Appaloosa Module
 * @since 0.0.1
 * @requires {@link module:Horse Horse}
 * @module Appaloosa
 * @description
 *  This module returns a constructor of type Appaloosa, an augmented
 *  Horse type.
 */
define([

	'pattern/Horse'

], function(Horse){

	/**
	 * @summary
	 *  Appaloosa Constructor
	 * @since 0.0.1
	 * @augments Horse
	 * @classdesc Appaloosa.prototype
	 * @function Appaloosa
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
