/**
 * @summary
 *  AngularJS Filter
 * @since 0.1.0
 * @requires {@link external:angular angular}
 * @requires {@link external:ngDefine ngDefine}
 * @namespace example/filter
 * @description
 *  The main application filter collection.
 */
ngDefine('example.filter', [

	// dependencies

], function(module){
	'use strict';

	module.filter('interpolateVersion',

		['meta',

		/**
		 * @summary
		 *  Interpolate Version
		 * @since 0.1.0
		 * @function example/filter.interpolateVersion
		 * @param
		 *  {example/service} meta - application configuration
		 * @return
		 *  {string} replaced text
		 */
		function( meta ){
			return function( text ){
				return String(text).replace(/\%VERSION\%/mg, meta.version);
			};
		}]

	);

});
