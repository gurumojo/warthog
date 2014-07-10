/**
 * @summary
 *  angularity filter test
 * @since 0.1.3
 * @author theguy@example.net
 * @package angularity
 * @subpackage filter-test
 */
define([

	'../../../lib/example/filter.js'

], function(ngDefine){
	'use strict';

	/**
	 * Filter Scenarios for Jasmine
	 */
	describe('filter', function(){
	
		beforeEach(module('example.filter'));
	
		describe('interpolateVersion', function(){
	
			beforeEach(module(function($provide){
				$provide.value('meta', {version: 'test'});
			}));
	
			it('should replace VERSION', inject(function(interpolateVersionFilter){
	
				expect(interpolateVersionFilter('before %VERSION% after')).
					toEqual('before test after');
			}));
		});
	});
});
