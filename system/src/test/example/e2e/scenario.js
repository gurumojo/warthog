/**
 * angularity scenario
 *
 * @author theguy@gurumojo.net
 * @package angularity
 * @subpackage scenario
 * @version 0.0.0
 */
'use strict';

/**
 * AngularJS Scenario
 * @see http://docs.angularjs.org/guide/dev_guide.e2e-testing
 * @todo provide element.dblclick() method
 */
describe('app', function(){

	beforeEach(function(){
		browser().navigateTo('../../../var/index.html');
	});

	describe('home', function(){

		beforeEach(function(){
			browser().navigateTo('#/home');
		});

		it('includes an element using the appDebug directive', function(){

			var debug = element('[app-debug]'),
				trans = element('[ng-transclude] > *');
			expect(debug.attr('app-debug')).toBe('Home Page');
			expect(trans.text()).toContain('location');
			expect(trans.count()).toBe(1);
		});

		it('responds to click events in the appDebug directive', function(){

			var header = element('[app-debug] > header'),
				section = element('[app-debug] > section');
			expect(section.css('display')).toBe('none');
			header.click();
			expect(section.css('display')).toBe('block');
			header.click();
			expect(section.css('display')).toBe('none');
		});

		it('includes an element using the inputTextEditor directive', function(){

			var span = element('[input-text-editor] > span'),
				input = element('[input-text-editor] > input');
			expect(input.attr('ng-model')).toBe('content.name');
			expect(input.count()).toBe(1);
			expect(span.count()).toBe(1);
		});

		it('binds input/output elements in the inputTextEditor directive', function(){

			var viewer = element('[input-text-editor] > span'),
				editor = element('[input-text-editor] > input');
			expect(editor.val()).toBe('Hola Mundo');
			expect(viewer.html()).toBe('Hola Mundo');
			input('content.name').enter('inputTextEditor');
			expect(editor.val()).toBe('inputTextEditor');
			expect(viewer.html()).toBe('inputTextEditor');
		});

		it('responds to click/blur events in the inputTextEditor directive', function(){

			var el = element('[input-text-editor]'),
				span = element('[input-text-editor] > span'),
				input = element('[input-text-editor] > input');
			expect(input.css('display')).toBe('none');
			expect(span.css('display')).toBe('block');
			el.dblclick();
			expect(input.css('display')).toBe('block');
			expect(span.css('display')).toBe('none');
			input.query(function(test, done){
				test[0].blur();
				done();
			});
			expect(input.css('display')).toBe('none');
			expect(span.css('display')).toBe('block');
		});

		it('includes an element using the textareaEditor directive', function(){

			var span = element('[textarea-editor] > span'),
				textarea = element('[textarea-editor] > textarea');
			expect(textarea.attr('ng-model')).toBe('content.description');
			expect(textarea.count()).toBe(1);
			expect(span.count()).toBe(1);
		});

		it('binds input/output elements in the textareaEditor directive', function(){

			var span = element('[textarea-editor] > span'),
				textarea = element('[textarea-editor] > textarea');
			expect(textarea.val()).toBe('A typical "Hello World" example');
			expect(span.html()).toBe('A typical "Hello World" example');
			input('content.description').enter('textareaEditor');
			expect(textarea.val()).toBe('textareaEditor');
			expect(span.html()).toBe('textareaEditor');
		});

		it('responds to click/blur events in the textareaEditor directive', function(){

			var el = element('[textarea-editor]'),
				span = element('[textarea-editor] > span'),
				textarea = element('[textarea-editor] > textarea');
			expect(span.css('display')).toBe('block');
			expect(textarea.css('display')).toBe('none');
			el.click();
			expect(span.css('display')).toBe('none');
			expect(textarea.css('display')).toBe('block');
			textarea.query(function(test, done){
				test[0].blur();
				done();
			});
			expect(span.css('display')).toBe('block');
			expect(textarea.css('display')).toBe('none');
		});
	});

	describe('login', function(){

		beforeEach(function(){
			browser().navigateTo('#/login');
		});

		it('renders a login form in the userSession directive', function(){

			var form = element('[user-session] > form[name=auth]'),
				field = element('[user-session] > form[name=auth] > input'),
				label = element('[user-session] > form[name=auth] > label'),
				legend = element('[user-session] > form[name=auth] > legend'),
				button = element('[user-session] > form[name=auth] > button');
			expect(form.attr('ng-hide')).toBe('active');
			expect(field.count()).toBe(3);
			expect(label.count()).toBe(2);
			expect(legend.count()).toBe(1);
			expect(button.count()).toBe(2);
		});

		it('renders a profile form in the userSession directive', function(){

			var form = element('[user-session] > form[name=edit]'),
				field = element('[user-session] > form[name=edit] > input'),
				label = element('[user-session] > form[name=edit] > label'),
				legend = element('[user-session] > form[name=edit] > legend'),
				button = element('[user-session] > form[name=edit] > button');
			expect(form.attr('ng-show')).toBe('active');
			expect(field.count()).toBe(5);
			expect(label.count()).toBe(5);
			expect(legend.count()).toBe(1);
			expect(button.count()).toBe(3);
		});

		it('binds model input elements in the userSession directive', function(){

			var user = element('[user-session] > form[name=auth] > input[name=username]'),
				pass = element('[user-session] > form[name=auth] > input[name=password]');
			expect(user.val()).toBe('');
			expect(pass.val()).toBe('');
			input('user.username').enter('username');
			input('user.password').enter('password');
			expect(user.val()).toBe('username');
			expect(pass.val()).toBe('password');
		});

		it('disables buttons per validation in the userSession directive', function(){

			var login = element('[user-session] > form[name=auth] > button[ng-click="login()"]'),
				resat = element('[user-session] > form[name=auth] > button[ng-click="reset()"]'),
				reset = element('[user-session] > form[name=edit] > button[ng-click="reset()"]'),
				update = element('[user-session] > form[name=edit] > button[ng-click="update()"]');
			expect(login.prop('disabled')).toBe(true);
			expect(resat.prop('disabled')).toBe(true);
			expect(reset.prop('disabled')).toBe(true);
			expect(update.prop('disabled')).toBe(true);
			input('user.username').enter('username');
			expect(login.prop('disabled')).toBe(true);
			expect(resat.prop('disabled')).toBe(false);
			expect(reset.prop('disabled')).toBe(false);
			input('user.password').enter('password');
			expect(login.prop('disabled')).toBe(false);
			expect(reset.prop('disabled')).toBe(false);
			input('user.avatar').enter('avatar');
			input('user.email').enter('email@any.net');
			input('user.family_name').enter('family_name');
			input('user.given_name').enter('given_name');
			input('user.handle').enter('handle');
			expect(resat.prop('disabled')).toBe(false);
			expect(reset.prop('disabled')).toBe(false);
			expect(update.prop('disabled')).toBe(false);
		});

		it('updates scope per status in the userSession directive', function(){

			var auth = element('[user-session] > form[name=auth] > input[name=session]'),
				user = element('[user-session] > form[name=auth] > input[name=username]'),
				pass = element('[user-session] > form[name=auth] > input[name=password]'),
				login = element('[user-session] > form[name=auth] > button[ng-click="login()"]'),
				logout = element('[user-session] > form[name=edit] > button[ng-click="logout()"]');
			input('user.username').enter('username');
			login.click();
			expect(auth.val()).toBe('0');
			expect(user.val()).toBe('username');
			expect(pass.val()).toBe('');
			input('user.password').enter('password');
			expect(pass.val()).toBe('password');
			login.click();
			expect(auth.val()).toBe('1');
			expect(user.val()).toBe('');
			expect(pass.val()).toBe('');
			logout.click();
			expect(auth.val()).toBe('0');
			expect(user.val()).toBe('');
			expect(pass.val()).toBe('');
		});
	});

	it('redirects to /home when location hash is not matched', function(){

		browser().navigateTo('#/abcdefg');
		expect(browser().location().url()).toBe("/home");
	});

	it('redirects to /home when location hash is empty', function(){

		browser().navigateTo('#');
		expect(browser().location().url()).toBe("/home");
	});
});
