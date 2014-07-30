/**
 * @summary
 *  System Bootstrap Process
 * @since 0.1.1
 * @requires {@link external:angular angular}
 * @requires {@link external:ngDefine ngDefine}
 * @requires {@link example/router example/router}
 * @namespace core/dom
 * @description
 *  This module provides a demonstration of how to bootstrap an example
 *  application. It is required by the {@link module:main main} module
 *  once it has determined that it is executing in a DOM environment,
 *  e.g. a browser window. This is where one might include any shared
 *  modules common throughout the client interface or complete any
 *  necessary system initialization.
 */
define([

	'ngDefine', 'angular'

], function(ngDefine, angular){

	require(['example/router'], function(){
		angular.bootstrap(document, ['example']);
	});
});
