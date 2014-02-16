define([

	'underscore', 'Corral', 'Pasture', 'Wrangler'

], function(_, Corral, Pasture, Wrangler){

	/**
	 * @summary
	 *  Horse Ranch
	 * @exports
	 *  ranch
	 * @since
	 *  0.0.1
	 * @description
	 *  A collection of Horse collection objects
	 */
	var ranch = {

		/**
		 * @summary
		 *  Horse Corral
		 * @description
		 *  An indoor collection of Horse objects
		 */
		corral: new Corral(),

		/**
		 * @summary
		 *  Horse Pasture
		 * @description
		 *  An outdoor collection of Horse objects
		 */
		pasture: new Pasture(),

		/**
		 * @summary
		 *  Horse Wrangler
		 * @description
		 *  A Horse collection Wrangler object
		 */
		wrangler: new Wrangler(),

		/**
		 * @summary
		 *  Horse Count
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
