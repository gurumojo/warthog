/**
 * @summary
 *  angularity service test
 * @since 0.1.3
 * @author theguy@example.net
 * @package angularity
 * @subpackage service-test
 */
define([

	'ngDefine', 'angular', 'angular-mocks'

], function(ngDefine){
	'use strict';

	require(['../../lib/example/service.js'], function(){
		/**
		 * Service Scenarios for Jasmine
		 */
		describe('service', function(){
		
			beforeEach(module('example.service'));
		
			describe('meta', function(){
		
				it('should return author string', inject(function(meta){
		
					expect(typeof meta.author).toEqual('string');
				}));
		
				it('should return description string', inject(function(meta){
		
					expect(typeof meta.description).toEqual('string');
				}));
		
				it('should return title string', inject(function(meta){
		
					expect(meta.title).toEqual('example');
				}));
		
				it('should return version string', inject(function(meta){
		
					expect(meta.version).toEqual('0.0.0');
				}));
			});
		
			describe('crypto', function(){
		
				var $httpBackend;
		 
				beforeEach(inject(function($injector){
					$httpBackend = $injector.get('$httpBackend');
					$httpBackend.when('GET', '../build/0.0.0/lib/crypt/md5.js').respond(200,
						'function MD5(){ this.hex_md5 = function(){} } return new MD5();'
					);
				}));
		 
				afterEach(function() {
					$httpBackend.verifyNoOutstandingExpectation();
					$httpBackend.verifyNoOutstandingRequest();
				});
		 
				it('should return an object with hash methods', function(){
		
					$httpBackend.expectGET('../build/0.0.0/lib/crypt/md5.js');
					inject(function(crypto){
						expect(crypto.hash).toBeUndefined();
						$httpBackend.flush();
						expect(typeof crypto.hash).toEqual('object');
						expect(typeof crypto.hash.hex_md5).toEqual('function');
					});
				});
			});
		
			describe('parser', function(){
		
				var $httpBackend;
		 
				beforeEach(inject(function($injector){
					$httpBackend = $injector.get('$httpBackend');
					$httpBackend.when('GET', '../build/0.0.0/lib/x2js/xml2json.js').respond(200,
						'function X2JS(){ this.xml_str2json = function(){} } return new X2JS();'
					);
				}));
		 
				afterEach(function() {
					$httpBackend.verifyNoOutstandingExpectation();
					$httpBackend.verifyNoOutstandingRequest();
				});
		 
				it('should return an object with hash methods', function(){
		
					$httpBackend.expectGET('../build/0.0.0/lib/x2js/xml2json.js');
					inject(function(parser){
						expect(parser.x2js).toBeUndefined();
						$httpBackend.flush();
						expect(typeof parser.x2js).toEqual('object');
						expect(typeof parser.x2js.xml_str2json).toEqual('function');
					});
				});
			});
		
			describe('session', function(){
		
				var $httpBackend, crypto;
		 
				beforeEach(inject(function($injector){
					$httpBackend = $injector.get('$httpBackend');
					$httpBackend.when('GET', '../build/0.0.0/lib/crypt/md5.js').respond(200,
						'function MD5(){ this.hex_md5 = function(){} } return new MD5();'
					);
					$httpBackend.when('GET', '../build/0.0.0/json/user/login').respond(200,
						'{"user":{"hash":"e17fd240178a67ce516bc6fdbb716c92"}}'
					);
					$httpBackend.when('POST', '../build/0.0.0/json/user/login').respond(201,
						'{"user":{"email":"test@ng.io"}}'
					);
					$httpBackend.when('GET', '../build/0.0.0/json/user/logout').respond(200,
						'{"user":{"logout":"test"}}'
					);
				}));
		 
				afterEach(function(){
					$httpBackend.verifyNoOutstandingExpectation();
					$httpBackend.verifyNoOutstandingRequest();
				});
		 
				it('should fetch an authentication token', function(){
		
					$httpBackend.expectGET('../build/0.0.0/lib/crypt/md5.js');
					inject(function(session){
						expect(session.user).toBeUndefined();
						session.fetch();
						$httpBackend.flush();
						expect(typeof session.user).toBe('object');
						expect(typeof session.user.hash).toBe('string');
					});
				});
		 
				it('should login with supplied credentials', function(){
		
					$httpBackend.expectPOST('../build/0.0.0/json/user/login',
						{login: 'test', token: true}
					);
					inject(function(session){
						expect(session.user).toBeUndefined();
						session.login({username: 'test', password: 'pass'});
						$httpBackend.flush();
						expect(typeof session.user).toBe('object');
						expect(session.user.email).toBe('test@ng.io');
						expect(session.user.hash).toBeUndefined();
					});
				});
		 
				it('should logout on request', function(){
		
					$httpBackend.expectGET('../build/0.0.0/json/user/logout');
					inject(function(session){
						expect(session.user).toBeUndefined();
						session.logout();
						$httpBackend.flush();
						expect(typeof session.user).toBe('object');
						expect(session.user.email).toBeUndefined();
						expect(session.user.hash).toBe('e17fd240178a67ce516bc6fdbb716c92');
					});
				});
			});
		});
	});
});
