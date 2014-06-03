/**
 * angularity filter test
 *
 * @author theguy@gurumojo.net
 * @package angularity
 * @subpackage filter-test
 * @version 0.0.0
 */
'use strict';

/**
 * Filter Scenarios for Jasmine
 */
describe('filter', function(){

	beforeEach(module('gurumojo.filter'));

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
