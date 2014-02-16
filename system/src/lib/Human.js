define([

	'underscore', 'Mammal'

], function(_, Mammal){

	/**
	 * @summary
	 *  Human Constructor
	 * @requires
	 *  {@link http://underscorejs.org/ underscore}
	 * @augments
	 *  Mammal
	 * @classdesc
	 *  Human.prototype
	 * @exports
	 *  Human
	 * @since
	 *  0.0.2
	 * @param
	 *  {object} option - enumerated instance properties
	 * @description
	 *  This module returns a constructor of type Human, an augmented
	 *  Mammal type.
	 * @constructor
	 */
	var Human = function Human(option){
		_.extend(this, option);
	};

	Human.prototype = {

		/**
		 * @summary
		 *  Copulate
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
		 * @return
		 *  {boolean} success
		 * @description
		 *  Clean to avoid disease
		 */
		wash: function(){
			return true;
		}
	};

	return Human;
});
