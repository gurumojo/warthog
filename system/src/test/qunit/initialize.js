define([

	'../qunit/Example',
	'../qunit/Cache'

], function(Example, Cache){

		// run tests
		Example.run();
		Cache.run();
		// start QUnit
		QUnit.load();
		QUnit.start();
});
