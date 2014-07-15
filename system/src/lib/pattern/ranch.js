/**
 * @summary
 *  Ranch Module
 * @since 0.0.1
 * @requires {@link http://underscorejs.org/ underscore}
 * @requires {@link module:Corral Corral}
 * @requires {@link module:Pasture Pasture}
 * @requires {@link module:Wrangler Wrangler}
 * @module ranch
 * @description
 *  This module returns an object of type ranch.
 */
define([

	'underscore', 'pattern/Corral', 'pattern/Pasture', 'pattern/Wrangler'

], function(_, Corral, Pasture, Wrangler){

	/**
	 * @summary
	 *  Horse Ranch
	 * @since 0.0.1
	 * @namespace ranch
	 * @description
	 *  A collection of Wrangler and Horse collection objects.
	 */
	var ranch = {

		/**
		 * @summary
		 *  Horse Corral
		 * @memberof ranch
		 * @description
		 *  An indoor collection of Horse objects
		 */
		corral: new Corral(),

		/**
		 * @summary
		 *  Horse Pasture
		 * @memberof ranch
		 * @description
		 *  An outdoor collection of Horse objects
		 */
		pasture: new Pasture(),

		/**
		 * @summary
		 *  Horse Wrangler
		 * @memberof ranch
		 * @description
		 *  A Horse collection Wrangler object
		 */
		wrangler: new Wrangler(),

		/**
		 * @summary
		 *  Horse Count
		 * @memberof ranch
		 * @return
		 *  {number}
		 * @description
		 *  Get a count of all Horses on the Ranch
		 */
		count: function(){
			return this.corral.size() + this.pasture.size();
		}
	};

	return ranch;
});
