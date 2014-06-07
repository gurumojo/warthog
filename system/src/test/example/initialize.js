/**
 * @summary
 *  System Bootstrap Process
 * @since 0.1.3
 * @requires {@link http://nikku.github.io/requirejs-angular-define/ ngDefine}
 * @requires {@link https://docs.angularjs.org/api/ angular}
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

	require([

		//'example/router',
		'../test/example/unit/controller'
		//'../test/example/unit/directive',
	//	'../test/example/unit/filter',
	//	'../test/example/unit/router'
	//	'../test/example/unit/service'

	], function(

		//router,
		controller
		//directive,
	//	filter,
	//	router,
	//	service

	){

		//angular.bootstrap(document, ['example']);
		// run tests
		//controller.run();
		//directive.run();
	//	filter.run();
	//	service.run();

	});
});
