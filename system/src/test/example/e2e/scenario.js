/**
 * @summary
 *  AngularJS Protractor
 * @description
 *  End-to-End Testing Scenarios
 * @see
 *  https://docs.angularjs.org/guide/e2e-testing
 */
describe('example', function(){
	'use strict';

	/**
	 * @summary
	 *  example.home
	 */
	describe('home', function(){

		beforeEach(function(){
			browser.get('#/home');
		});

		it('includes an element using the appDebug directive', function(){

			var debug = element(by.css('[app-debug]'));
			expect(debug.getAttribute('app-debug')).toBe('Home Page');
		});

		it('includes an element using the inputTextEditor directive', function(){

			var span = element.all(by.css('[input-text-editor] > span'));
			var input = element.all(by.css('[input-text-editor] > input'));
			expect(input.count()).toBe(1);
			expect(span.count()).toBe(1);
		});

		it('includes an element using the textareaEditor directive', function(){

			var span = element.all(by.css('[textarea-editor] > span'));
			var textarea = element.all(by.css('[textarea-editor] > textarea'));
			expect(textarea.count()).toBe(1);
			expect(span.count()).toBe(1);
		});

		/**
		 * @summary
		 *  example.home.appDebug
		 */
		describe('appDebug', function(){

			it('displays appDebug output in preformatted text', function(){

				var scope = element(by.css('[app-debug] pre.ng-scope'));
				expect(scope.getInnerHtml()).toContain('location');
			});

			it('opens and closes on appDebug header click events', function(){

				var header = element(by.css('[app-debug] > header'));
				var section = element(by.css('[app-debug] > section'));
				expect(section.isDisplayed()).toBe(false);
				header.click();
				expect(section.isDisplayed()).toBe(true);
				header.click();
				expect(section.isDisplayed()).toBe(false);
			});
		});

		/**
		 * @summary
		 *  example.home.inputTextEditor
		 */
		describe('inputTextEditor', function(){

			it('provides a model input for content.name', function(){

				var input = element(by.model('content.name'));
				expect(input.getTagName()).toBe('input');
			});

			it('binds a display span to content.name', function(){

				var span = element(by.binding('content.name'));
				expect(span.getTagName()).toBe('span');
			});

			it('shows the input when the span is double-clicked', function(){

				var input = element(by.model('content.name'));
				var span = element(by.binding('content.name'));
				expect(input.isDisplayed()).toBe(false);
				expect(span.isDisplayed()).toBe(true);
				browser.actions().doubleClick(span).perform();
				expect(input.isDisplayed()).toBe(true);
				expect(span.isDisplayed()).toBe(false);
			});

			it('updates the span when the input changes', function(){

				var input = element(by.model('content.name'));
				var span = element(by.binding('content.name'));
				var header = element(by.css('.navbar'));
				span.getText().then(function(text){
					browser.actions().doubleClick(span).perform();
					input.sendKeys('!');
					browser.actions().click(header).perform();
					span.getText().then(function(update){
						expect(update).toBe(text +'!');
					});
				});
			});

			it('shows the span when when the input is blurred', function(){

				var input = element(by.model('content.name'));
				var span = element(by.binding('content.name'));
				var header = element(by.css('.navbar'));
				browser.actions().doubleClick(span).perform();
				expect(input.isDisplayed()).toBe(true);
				expect(span.isDisplayed()).toBe(false);
				browser.actions().click(header).perform();
				expect(input.isDisplayed()).toBe(false);
				expect(span.isDisplayed()).toBe(true);
			});
		});

		/**
		 * @summary
		 *  example.home.textareaEditor
		 */
		describe('textareaEditor', function(){

			it('provides a model input for content.description', function(){

				var textarea = element(by.model('content.description'));
				expect(textarea.getTagName()).toBe('textarea');
			});

			it('binds a display span to content.description', function(){

				var span = element(by.binding('content.description'));
				expect(span.getTagName()).toBe('span');
			});

			it('shows the textarea when the span is clicked', function(){

				var textarea = element(by.model('content.description'));
				var span = element(by.binding('content.description'));
				expect(textarea.isDisplayed()).toBe(false);
				expect(span.isDisplayed()).toBe(true);
				browser.actions().click(span).perform();
				expect(textarea.isDisplayed()).toBe(true);
				expect(span.isDisplayed()).toBe(false);
			});

			it('updates the span when the textarea changes', function(){

				var textarea = element(by.model('content.description'));
				var span = element(by.binding('content.description'));
				var header = element(by.css('.navbar'));
				span.getText().then(function(text){
					browser.actions().click(span).perform();
					textarea.sendKeys('!');
					browser.actions().click(header).perform();
					span.getText().then(function(update){
						expect(update).toBe('!'+ text);
					});
				});
			});

			it('shows the span when when the textarea is blurred', function(){

				var textarea = element(by.model('content.description'));
				var span = element(by.binding('content.description'));
				var header = element(by.css('.navbar'));
				browser.actions().doubleClick(span).perform();
				expect(textarea.isDisplayed()).toBe(true);
				expect(span.isDisplayed()).toBe(false);
				browser.actions().click(header).perform();
				expect(textarea.isDisplayed()).toBe(false);
				expect(span.isDisplayed()).toBe(true);
			});
		});
	});

	/**
	 * @summary
	 *  example.login
	 */
	describe('login', function(){

		beforeEach(function(){
			browser.get('#/login');
		});

		it('includes an element using the userSession directive', function(){

			var session = element.all(by.css('[user-session]'));
			expect(session.count()).toBe(1);
		});

		/**
		 * @summary
		 *  example.login.userSession
		 */
		describe('userSession', function(){

			it('provides a model input for user.username', function(){

				var input = element(by.model('user.username'));
				expect(input.getTagName()).toBe('input');
			});

			it('provides a model input for user.password', function(){

				var input = element(by.model('user.password'));
				expect(input.getTagName()).toBe('input');
			});

			it('provides a model input for user.avatar', function(){

				var input = element(by.model('user.avatar'));
				expect(input.getTagName()).toBe('input');
			});

			it('provides a model input for user.email', function(){

				var input = element(by.model('user.email'));
				expect(input.getTagName()).toBe('input');
			});

			it('provides a model input for user.family_name', function(){

				var input = element(by.model('user.family_name'));
				expect(input.getTagName()).toBe('input');
			});

			it('provides a model input for user.given_name', function(){

				var input = element(by.model('user.given_name'));
				expect(input.getTagName()).toBe('input');
			});

			it('provides a model input for user.handle', function(){

				var input = element(by.model('user.handle'));
				expect(input.getTagName()).toBe('input');
			});

			it('binds a hidden session input to active', function(){

				var active = element(by.css('input[name=session]'));
				expect(active.getAttribute('type')).toBe('hidden');
			});

			it('binds auth and edit form legend tags to legend', function(){

				var legend = element.all(by.binding('legend'));
				expect(legend.count()).toBe(2);
				legend.each(function(x){
					expect(x.getTagName()).toBe('legend');
				});
			});

			it('renders an auth form (hidden for active sessions)', function(){

				var form = element(by.css('[user-session] > form[name=auth]'));
				expect(form.getAttribute('ng-hide')).toBe('active');
			});

			it('renders an edit form (shown for active sessions)', function(){

				var form = element(by.css('[user-session] > form[name=edit]'));
				expect(form.getAttribute('ng-show')).toBe('active');
			});

			it('shows the login form for inactive sessions', function(){

				var auth = element(by.css('[user-session] > form[name=auth]'));
				var edit = element(by.css('[user-session] > form[name=edit]'));
				expect(auth.isDisplayed()).toBe(true);
				expect(edit.isDisplayed()).toBe(false);
			});

			//it('shows the profile form for active sessions', function(){

			//	var auth = element(by.css('[user-session] > form[name=auth]'));
			//	var edit = element(by.css('[user-session] > form[name=edit]'));
			//	/**
			//	 * @todo
			//	 *  implement login mocks
			//	 */
			//	expect(auth.isDisplayed()).toBe(false);
			//	expect(edit.isDisplayed()).toBe(true);
			//});

			it('disables auth form buttons per directive validation', function(){

				var username = element(by.model('user.username'));
				var password = element(by.model('user.password'));
				var auth = {
					login: element(by.css('[user-session] > form[name=auth] > button[ng-click="login()"]')),
					reset: element(by.css('[user-session] > form[name=auth] > button[ng-click="reset()"]'))
				};
				expect(auth.login.isEnabled()).toBe(false);
				expect(auth.reset.isEnabled()).toBe(false);
				username.sendKeys('username');
				expect(auth.login.isEnabled()).toBe(false);
				expect(auth.reset.isEnabled()).toBe(true);
				password.sendKeys('password');
				expect(auth.login.isEnabled()).toBe(true);
				expect(auth.reset.isEnabled()).toBe(true);
			});

			//it('disables edit form buttons per directive validation', function(){

			//	var avatar = element(by.model('user.avatar'));
			//	var email = element(by.model('user.email'));
			//	var family_name = element(by.model('user.family_name'));
			//	var given_name = element(by.model('user.given_name'));
			//	var handle = element(by.model('user.handle'));
			//	var edit = {
			//		logout: element(by.css('[user-session] > form[name=edit] > button[ng-click="logout()"]')),
			//		reset: element(by.css('[user-session] > form[name=edit] > button[ng-click="reset()"]')),
			//		update: element(by.css('[user-session] > form[name=edit] > button[ng-click="update()"]'))
			//	};
			//	/**
			//	 * @todo
			//	 *  implement login mocks
			//	 */
			//	expect(edit.logout.isEnabled()).toBe(true);
			//	expect(edit.reset.isEnabled()).toBe(false);
			//	expect(edit.update.isEnabled()).toBe(false);
			//	avatar.sendKeys('avatar');
			//	email.sendKeys('email@ng.io');
			//	family_name.sendKeys('family_name');
			//	given_name.sendKeys('given_name');
			//	handle.sendKeys('handle');
			//	expect(edit.logout.isEnabled()).toBe(true);
			//	expect(edit.reset.isEnabled()).toBe(true);
			//	expect(edit.update.isEnabled()).toBe(true);
			//});
		});
	});

	/**
	 * @summary
	 *  example redirect
	 */
	it('redirects to /home when location hash is not matched', function(){

		browser.get('#/abcdefg');
		expect(browser.getCurrentUrl()).toMatch(/\/home$/);
	});

	/**
	 * @summary
	 *  default route
	 */
	it('redirects to /home when location hash is empty', function(){

		browser.get('#');
		expect(browser.getCurrentUrl()).toMatch(/\/home$/);
	});
});
