/**
 * @summary
 *  Clydesdale Module
 * @since 0.0.1
 * @requires {@link module:Horse Horse}
 * @module Clydesdale
 * @description
 *  This module returns a constructor of type Clydesdale, an augmented
 *  Horse type.
 */
define([

	'pattern/Horse'

], function(Horse){

	/**
	 * @summary
	 *  Clydesdale Constructor
	 * @since 0.0.1
	 * @augments Horse
	 * @classdesc Clydesdale.prototype
	 * @function Clydesdale
	 * @param
	 *  {string} name - customized reference
	 * @constructor
	 */
	function Clydesdale(name){
		this.name = name || 'horse';
		this.type = 'draught';
	}

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
