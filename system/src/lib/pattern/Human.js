/**
 * @summary
 *  Human Module
 * @since 0.0.2
 * @requires {@link http://underscorejs.org/ underscore}
 * @requires {@link module:Mammal Mammal}
 * @module Human
 * @description
 *  This module returns a constructor of type Human, an augmented
 *  Mammal type.
 */
define([

	'underscore', 'pattern/Mammal'

], function(_, Mammal){

	/**
	 * @summary
	 *  Human Constructor
	 * @since 0.0.2
	 * @augments Mammal
	 * @classdesc Human.prototype
	 * @function Human
	 * @param
	 *  {object} option - enumerated instance properties
	 * @description
	 *  Create a new object with supplied attributes.
	 * @constructor
	 */
	function Human(option){
		_.extend(this, option);
	}

	Human.prototype = _.extend(new Mammal(), {

		/**
		 * @summary
		 *  Copulate
		 * @memberof Human
		 * @return
		 *  {boolean} success
		 * @description
		 *  Consummate a relationship
		 */
		mate: function(){
			return true;
		},

		/**
		 * @summary
		 *  Bathe
		 * @memberof Human
		 * @return
		 *  {boolean} success
		 * @description
		 *  Clean to avoid disease
		 */
		wash: function(){
			return true;
		}
	});

	return Human;
});
