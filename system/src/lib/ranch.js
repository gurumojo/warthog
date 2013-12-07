/**
 * Ranch Module
 */
define([

	'underscore', 'corral', 'pasture', 'appaloosa', 'clydesdale'

], function(_, corral, pasture, Appaloosa, Clydesdale){

	/**
	 * A collection of Horse collection objects
	 *
	 * @exports ranch
	 * @version 0.0
	 */
	var ranch = {

		/**
		 * An indoor collection of Horse objects
		 */
		corral: corral,

		/**
		 * An outdoor collection of Horse objects
		 */
		pasture: pasture,

		/**
		 * Get a count of all Horses on the Ranch
		 *
		 * @return {number}
		 */
		count: function(){
			return this.corral.size() + this.pasture.size();
		},

		/**
		 * Set the default Horse collection (only once)
		 *
		 * @method
		 * @return {object}
		 */
		initialize: _.once(function(){
			this.corral.set('Appaloosa', new Appaloosa());
			this.pasture.set('Clydesdale', new Clydesdale());
			return this;
		})
	};

	return ranch.initialize();
});
