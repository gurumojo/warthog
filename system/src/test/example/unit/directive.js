/**
 * @summary
 *  angularity directive test
 * @since 0.1.3
 * @author theguy@example.net
 * @package angularity
 * @subpackage directive-test
 */
define([

	'ngDefine', 'angular', 'angular-mocks'

], function(ngDefine){
	'use strict';

	require(['../../lib/example/directive.js'], function(){
		/**
		 * Directive Scenarios for Jasmine
		 */
		describe('directive', function(){
		
			var scope, markup, element;
		
			beforeEach(module('example.directive'));
		
			describe('app-debug', function(){
		
				beforeEach(inject(function($rootScope, $compile){
					scope = $rootScope.$new();	
					markup = '<span app-debug></span>';
					element = $compile(markup)(scope);
				}));
		
				it('should render a collapsed debug element', function(){
		
					var header = element.find('header'),
						section = element.find('section');
					expect(element.hasClass('closed')).toBe(true);
					expect(header.length).toBe(1);
					expect(header.html()).toBe('debug: {{header}}');
					expect(section.length).toBe(1);
					expect(section.html()).toBe('');
				});
		
				it('should expand or collapse on click', function(){
		
					var header = element.find('header');
					header.triggerHandler('click');
					expect(element.hasClass('opened')).toBe(true);
					header.triggerHandler('click');
					expect(element.hasClass('closed')).toBe(true);
				});
			});
		
			describe('app-version', function(){
		
				it('should print current title and version', function(){
		
					module(function($provide) {
						$provide.value('meta', {title: 'test', version: '0.0.0'});
					});
		
					inject(function($compile, $rootScope){
						var element = $compile('<span app-version></span>')($rootScope);
						expect(element.text()).toEqual('test 0.0.0');
						expect(element.html()).toEqual('test 0.0.0');
					});
				});
			});
		
			describe('input-text-editor', function(){
		
				beforeEach(inject(function($rootScope, $compile){
					scope = $rootScope.$new();	
					scope.test = {};
					markup = '<span input-text-editor="test.model"></span>';
					element = $compile(markup)(scope);
				}));
		
				it('should render an editable element', function(){
		
					var editor = element.find('input'),
						viewer = element.find('span');
					expect(editor.length).toBe(1);
					expect(editor.attr('ng-model')).toBe('test.model');
					expect(editor.val()).toBe('');
					expect(viewer.length).toBe(1);
					expect(viewer.html()).toBe('{{test.model}}');
				});
		
				it('should render an input with focus on click', function(){
		
					var editor = element.find('input'),
						viewer = element.find('span');
					expect(editor.css('display')).toBe('none');
					expect(viewer.css('display')).toBe('block');
					element.triggerHandler('dblclick');
					expect(editor.css('display')).toBe('block');
					expect(viewer.css('display')).toBe('none');
					editor.triggerHandler('blur');
					expect(editor.css('display')).toBe('none');
					expect(viewer.css('display')).toBe('block');
				});
			});
		
			describe('textarea-editor', function(){
		
				beforeEach(inject(function($rootScope, $compile){
					scope = $rootScope.$new();	
					markup = '<span textarea-editor="test.model"></span>';
					element = $compile(markup)(scope);
				}));
		
				it('should render an editable element', function(){
		
					var editor = element.find('textarea'),
						viewer = element.find('span');
					expect(editor.length).toBe(1);
					expect(editor.attr('ng-model')).toBe('test.model');
					expect(editor.val()).toBe('');
					expect(viewer.length).toBe(1);
					expect(viewer.html()).toBe('{{test.model}}');
				});
		
				it('should render a textarea with focus on click', function(){
		
					var editor = element.find('textarea'),
						viewer = element.find('span');
					expect(editor.css('display')).toBe('none');
					expect(viewer.css('display')).toBe('block');
					element.triggerHandler('click');
					expect(editor.css('display')).toBe('block');
					expect(viewer.css('display')).toBe('none');
					editor.triggerHandler('blur');
					expect(editor.css('display')).toBe('none');
					expect(viewer.css('display')).toBe('block');
				});
			});
		
			describe('user-session', function(){
		
				//var $httpBackend;
		
				beforeEach(inject(function($injector, $rootScope, $compile){
					//$httpBackend = $injector.get('$httpBackend');
					//$httpBackend.when('GET', 'html/session.html').respond(200,
					//	'<div><form name="auth"></form><form name="edit"></form></div>'
					//);
					scope = $rootScope.$new();	
					scope.fetch = function(){};
					scope.login = function(){};
					scope.logout = function(){};
					scope.reset = function(){};
					scope.update = function(){};
					spyOn(scope, 'fetch');
					spyOn(scope, 'login');
					spyOn(scope, 'logout');
					spyOn(scope, 'reset');
					spyOn(scope, 'update');
					//$httpBackend.expectGET('html/session.html');
					element = $compile('<span user-session></span>')(scope);
				}));
		 
				//afterEach(function() {
				//	$httpBackend.verifyNoOutstandingExpectation();
				//	$httpBackend.verifyNoOutstandingRequest();
				//});
		
				it('renders a login form and a profile form', function(){
		
					expect(element.find('form').length).toBe(2);
					expect(element.find('form').attr('name')).toBe('auth');
					expect(element.find('input').length).toBe(8);
					expect(element.find('input').attr('ng-model')).toBe('user.username');
					expect(element.find('input').prop('required')).toBe(true);
					expect(element.find('button').length).toBe(5);
					expect(element.find('button').attr('ng-click')).toBe('login()');
					expect(element.find('button').attr('ng-disabled')).toBe('auth.$invalid');
					expect(angular.element(element.find('button')[0]).text()).toBe('login');
				});
		
				it('should call initialization methods on link', function(){
		
					expect(scope.reset).toHaveBeenCalled();
					expect(scope.fetch).toHaveBeenCalled();
					expect(scope.login).not.toHaveBeenCalled();
					expect(scope.logout).not.toHaveBeenCalled();
					expect(scope.update).not.toHaveBeenCalled();
				});
		
				it('should call bound methods on click', function(){
		
					expect(element.find('button').length).toBe(5);
					element.find('button').triggerHandler('click');
					expect(scope.fetch.callCount).toBe(1);
					expect(scope.login.callCount).toBe(1);
					expect(scope.logout.callCount).toBe(1);
					expect(scope.reset.callCount).toBe(3);
					expect(scope.update.callCount).toBe(1);
				});
			});
		});
	});
});
