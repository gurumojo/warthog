/**
 * @summary
 *  Example Module
 * @since 0.0.1
 * @requires {@link http://underscorejs.org/ underscore}
 * @module Example
 * @description
 *  This module returns a constructor of type Example.
 */
define([

	'underscore'

], function(_){

	/**
	 * @summary
	 *  Example Constructor
	 * @since 0.0.1
	 * @classdesc Example.prototype
	 * @function Example
	 * @param
	 *  {object} option - enumerated instance properties
	 * @description
	 *  This constructor accepts one argument: an object with properties
	 *  that will be assigned to instance attributes using the same keys.
	 * @constructor
	 */
	function Example(option){
		_.extend(this, option);
	}

	Example.prototype = {

		/**
		 * @summary
		 *  Dump Member Values
		 * @since 0.0.1
		 * @memberof Example
		 * @description
		 *  Display all object properties in a manner appropriate to
		 *  the execution environment (e.g. {@link core/cli CLI} or
		 *  {@link core/dom DOM}).
		 */
		dump: function(){
			if(typeof window ==='undefined'){
				console.log('CLI', this);
			} else {
				console.log('DOM', this);
			}
		}
	};

	return Example;
});
