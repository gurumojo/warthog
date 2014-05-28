/**
 * @summary
 *  AngularJS Filter
 * @description
 *  The main application filter collection.
 */
ngDefine('example.filter', [

	// dependencies

], function(module){
	'use strict';

	/**
	 * AngularJS Filter
	 */
	module.filter('interpolateVersion',
	
		['meta',
	
		function( meta ){
			return function( text ){
				return String(text).replace(/\%VERSION\%/mg, meta.version);
			}
		}]
	
	);

});
