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
	var Example = function Example(option){
		_.extend(this, option);
	};

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
		},

		/**
		 * @summary
		 *  Get Member Values
		 * @since
		 *  0.0.1
		 * @param
		 *  {(string|string[])} key - instance member reference(s)
		 * @return
		 *  {array} instance member value(s)
		 * @description
		 *  Return the object property value(s) for the supplied key(s).
		 *  The key parameter may be a string or an array of strings.
		 */
		get: function(key){
			return _.values(_.pick(this, key));
		},

		/**
		 * @summary
		 *  Set Member Values
		 * @since
		 *  0.0.1
		 * @param
		 *  {string} key - instance member reference
		 * @param
		 *  {*} value - instance member assignment
		 * @return
		 *  {boolean} instance updated
		 * @description
		 *   Update the object property key with the supplied value.
		 */
		set: function(key, value){
			var success = false;
			if(this.hasOwnProperty(key)){
				success = true;
				this[key] = value;
			}
			return success;
		},

		/**
		 * @summary
		 *  Search Member Objects
		 * @since
		 *  0.0.1
		 * @param
		 *  {object} option - member query hash
		 * @return
		 *  {array} object collection
		 * @description
		 *  Find and return a collection of objects with properties
		 *  matching the supplied query object key/value pairs.
		 */
		search: function(option){
			return _.where(this, option);
		}
	};

	return Example;
});
