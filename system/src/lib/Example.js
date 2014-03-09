define([

	'underscore'

], function(_){

	/**
	 * @summary
	 *  Example Constructor
	 * @requires
	 *  {@link http://underscorejs.org/ underscore}
	 * @classdesc
	 *  Example.prototype
	 * @exports
	 *  Example
	 * @since
	 *  0.0.1
	 * @param
	 *  {object} option - enumerated instance properties
	 * @description
	 *  This module returns a constructor of type Example. It accepts
	 *  one argument: an object with properties that will be assigned
	 *  to instance attributes using the same keys.
	 * @constructor
	 */
	function Example(option){
		_.extend(this, option);
	}

	Example.prototype = {

		/**
		 * @summary
		 *  Dump Member Values
		 * @since
		 *  0.0.1
		 * @description
		 *  Display all object properties in a manner appropriate to
		 *  the execution environment (e.g. {@link CLI} or {@link DOM}).
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
