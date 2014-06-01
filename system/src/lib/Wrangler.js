/**
 * @summary
 *  Wrangler Module
 * @since 0.0.2
 * @requires {@link http://underscorejs.org/ underscore}
 * @requires {@link module:Human Human}
 * @requires {@link module:Horse Horse}
 * @module Wrangler
 * @description
 *  This module returns a constructor of type {@link Wrangler}, an
 *  augmented {@link Human} type.
 */
define([

	'underscore', 'Human', 'Horse'

], function(_, Human, Horse){

	/**
	 * @summary
	 *  Wrangler Constructor
	 * @since 0.0.2
	 * @augments Human
	 * @classdesc Wrangler.prototype
	 * @function Wrangler
	 * @param
	 *  {object} option - enumerated instance properties
	 * @description
	 *  Create a new object with supplied attributes.
	 * @constructor
	 */
	function Wrangler(option){
		_.extend(this, option);
	}

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
			if(!(horse instanceof Horse)){
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
			if(!(horse instanceof Horse)){
				throw new TypeError('Horse parameter required');
			}
			return true;
		}

	};

	_.defaults(Wrangler.prototype, Human.prototype);

	return Wrangler;
});
