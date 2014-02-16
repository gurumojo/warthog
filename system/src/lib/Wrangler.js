define([

	'underscore', 'Human'

], function(_, Human){

	/**
	 * @summary
	 *  Wrangler Constructor
	 * @requires
	 *  {@link http://underscorejs.org/ underscore}
	 * @augments
	 *  Human
	 * @classdesc
	 *  Wrangler.prototype
	 * @exports
	 *  Wrangler
	 * @since
	 *  0.0.2
	 * @param
	 *  {object} option - enumerated instance properties
	 * @description
	 *  This module returns a constructor of type Wrangler, an augmented
	 *  Human type.
	 * @constructor
	 */
	var Wrangler = function Wrangler(option){
		_.extend(this, option);
	};

	Wrangler.prototype = {

		/**
		 * @summary
		 *  Break a Horse
		 * @param
		 *  {Horse} horse - wild equine
		 * @return
		 *  {boolean} success
		 * @description
		 *  Run a passed in Horse instance through exercises intended to
		 *  tame a wild equine.
		 */
		break: function(horse){
			if(!horse instanceof Horse){
				throw new TypeError('Horse parameter required');
			}
			return true;
		},

		/**
		 * @summary
		 *  Ride a Horse
		 * @param
		 *  {Horse} horse - tame equine
		 * @return
		 *  {boolean} success
		 * @description
		 *  Run a passed in Horse instance through exercises intended to
		 *  maintain a tame equine.
		 */
		ride: function(horse){
			if(!horse instanceof Horse){
				throw new TypeError('Horse parameter required');
			}
			return true;
		}

	};

	_.defaults(Wrangler.prototype, Human.prototype);

	return Wrangler;
});
