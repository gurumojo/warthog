/**
 * @summary
 *  AngularJS Directive
 * @since 0.1.0
 * @namespace example/directive
 * @description
 *  The main application directive collection.
 */
ngDefine('example.directive', [

	// dependencies

], function(module){
	'use strict';

	module.directive('appDebug', [

		/**
		 * @summary
		 *  app-debug
		 * @since 0.1.0
		 * @function example/directive#appDebug
		 * @param
		 *  {string} $scope.title - header model property
		 * @param
		 *  {string} $scope.debug - content model property
		 * @description
		 *  A directiveDefinitionObject providing scope model properties
		 *  for the template label as well as (optionally filtered) output.
		 *  The resulting markup allows for clicking on the debug header to
		 *  expand from its default collapsed state to reveal output
		 *  containing dynamically updating scope information.
		 * @example
		 *  <div app-debug="{{title}}"><pre>{{debug|json}}</pre></div>
		 */
		function(){
			return {
				replace: true,
				transclude: true,
				scope: {
					header: '@appDebug'
				},
				template: ''+
					'<div class="debug">'+
						'<header>debug: {{header}}</header>'+
						'<section ng-transclude></section>'+
					'</div>',
				link: function( scope, element, attribute ){
					var header = element.find('header'),
						opened = true;
					header.bind('click', toggle);
					function toggle(){
						opened = !opened;
						element.removeClass(opened ? 'closed' : 'opened');
						element.addClass(opened ? 'opened' : 'closed');
					}
					toggle();
				}
			};
		}]

	).directive('appFooter', [

		/**
		 * @summary
		 *  app-footer
		 * @since 0.1.0
		 * @function example/directive#appFooter
		 * @description
		 *  A directiveDefinitionObject presenting markup produced by the
		 *  appVersion directive.
		 * @example
		 *  <footer app-footer role="contentinfo"></footer>
		 */
		function(){
			return {
				transclude: true,
				template: '<div app-version></div>',
				link: function( scope, element, attribute ){
					element.addClass('footer');
				}
			};
		}]

	).directive('appLoading', ['meta',

		/**
		 * @summary
		 *  app-loading
		 * @since 0.1.0
		 * @requires {@link example/service.meta}
		 * @function example/directive#appLoading
		 * @description
		 *  A postLink method providing markup for displaying a spinner image
		 *  (loading indicator).
		 * @example
		 *  <div app-loading></div>
		 */
		function( meta ){
			return function( scope, element, attribute, controller ){
				element.html('<div class="splash">'+
					'<img src="'+ meta.url.base +'img/loading.gif" alt="Loading..." />'+
				'</div>');
			};
		}]

	).directive('appNavigation', ['meta',

		/**
		 * @summary
		 *  app-navigation
		 * @since 0.1.0
		 * @requires {@link example/service.meta}
		 * @function example/directive#appNavigation
		 * @description
		 *  A postLink method providing markup for a static navabr as
		 *  supported by the bootstrap library.
		 * @example
		 *  <header app-navigation role="banner"></header>
		 */
		function( meta ){
			return function( scope, element, attribute, controller ){
				element.addClass('navbar navbar-static-top');
				element.html('<nav class="navbar-inner">'+
					'<ul class="nav menu">'+
						'<li><a href="#/home">home</a></li>'+
						'<li><a href="#/login">login</a></li>'+
						'<li><a href="#/other">other</a></li>'+
						'<li><a target="_blank" href="/system/src/test/jasmine/index.html">test</a></li>'+
					'</ul>'+
				'</nav>');
			};
		}]

	).directive('appVersion', ['meta',

		/**
		 * @summary
		 *  app-version
		 * @since 0.1.0
		 * @requires {@link example/service.meta}
		 * @function example/directive#appVersion
		 * @description
		 *  A postLink method that edits markup to combine data from the meta
		 *  service. It displays the application title and version number at
		 *  half the normal text opacity.
		 * @example
		 *  <div app-version></div>
		 */
		function( meta ){
			return function( scope, element, attribute, controller ){
				element.css({
					opacity: 0.5,
					filter: 'alpha(opacity=50)',
					zoom: 1
				});
				element.text(meta.title +' '+ meta.version);
			};
		}]

	).directive('inputTextEditor', [

		/**
		 * @summary
		 *  input-text-editor
		 * @since 0.1.0
		 * @function example/directive#inputTextEditor
		 * @param
		 *  {string} $scope.namespace.attribute - editor model property
		 * @description
		 *  A contentEditable directiveDefinitionObject allows editing of a
		 *  child span via text input. It is triggered on dblclick, released
		 *  on blur. The targeted child attribute needs to be nested within a
		 *  parent scope object in order to allow for the dynamic updating of
		 *  bound properties.
		 * @example
		 *  <div input-text-editor="namespace.attribute"></div>
		 */
		function(){
			return {
				compile: function( element, attribute, transclude ){
					element.html(
						'<input type="text" ng-model="'+ attribute.inputTextEditor +'" />'+
						'<span>{{'+ attribute.inputTextEditor +'}}</span>'
					);
					return function( scope, element, attribute, controller ){
						var editor = element.find('input'),
							viewer = element.find('span'),
							enable = function(){
								editor.css('display','block');
								viewer.css('display','none');
							},
							disable = function(){
								viewer.css('display','block');
								editor.css('display','none');
							};
						editor.bind('focus', enable).bind('blur', disable);
						element.bind('dblclick', function(click){
							enable();
							editor[0].focus();
						});
						disable();
					};
				}
			};
		}]

	).directive('textareaEditor', [

		/**
		 * @summary
		 *  textarea-editor
		 * @since 0.1.0
		 * @function example/directive#textareaEditor
		 * @param
		 *  {string} $scope.namespace.attribute - editor model property
		 * @description
		 *  A contentEditable directiveDefinitionObject allows editing of a
		 *  child span via text input. It is triggered on click, released on
		 *  blur. The targeted child attribute needs to be nested within a
		 *  parent scope object in order to allow for the dynamic updating of
		 *  bound properties.
		 * @example
		 *  <div textarea-editor="namespace.attribute"></div>
		 */
		function(){
			return {
				compile: function( element, attribute, transclude ){
					element.html(
						'<textarea ng-model="'+ attribute.textareaEditor +'"></textarea>'+
						'<span>{{'+ attribute.textareaEditor +'}}</span>'
					);
					return function( scope, element, attribute, controller ){
						var editor = element.find('textarea'),
							viewer = element.find('span'),
							enable = function(){
								editor.css('display','block');
								viewer.css('display','none');
							},
							disable = function(){
								viewer.css('display','block');
								editor.css('display','none');
							};
						editor.bind('focus', enable).bind('blur', disable);
						element.bind('click', function(click){
							enable();
							editor[0].focus();
						});
						disable();
					};
				}
			};
		}]

	).directive('userSession', [

		/**
		 * @summary
		 *  user-session
		 * @since 0.1.0
		 * @requires {@link example/service.session}
		 * @requires {@link example/controller.LoginController}
		 * @function example/directive#userSession
		 * @description
		 *  A directiveDefinitionObject providing form markup for user
		 *  authentication and profile editing, as well as an inline debug
		 *  output revealing model data for use in development.
		 * @todo
		 *  Loosen coupling with the LoginController and session service to
		 *  provide better separation of concerns.
		 * @example
		 *  <div user-session></div>
		 */
		function(){
			return {
				replace: true,
				//templateUrl: 'html/session.html',
				template: 
					'<div>'+
						'<form name="auth" ng-hide="active" novalidate>'+
							'<legend>{{legend}}</legend>'+
							'<input name="username" placeholder="username" '+
								'type="text" ng-model="user.username" required />'+
							'<label for="username" class="control-label">'+
								'<span class="error" ng-show="auth.username.$error.required">*</span>'+
							'</label><br />'+
							'<input name="password" placeholder="password" '+
								'type="password" ng-model="user.password" required />'+
							'<label for="password" class="control-label">'+
								'<span class="error" ng-show="auth.password.$error.required">*</span>'+
							'</label><br />'+
							'<input name="session" value="{{active}}" type="hidden" />'+
							'<button ng-click="login()" ng-disabled="auth.$invalid">login</button>'+
							'<button ng-click="reset()" ng-disabled="unchanged()">undo</button>'+
							'<hr />'+
							'<pre>valid = {{ auth.$valid | json }}</pre>'+
							'<pre>dirty = {{ auth.$dirty | json }}</pre>'+
							'<pre>username = {{ auth.username.$error | json }}</pre>'+
							'<pre>password = {{ auth.password.$error | json }}</pre>'+
							'<pre>model = {{ user | json }}</pre>'+
						'</form>'+
						'<form name="edit" ng-show="active" novalidate>'+
							'<legend>{{legend}}</legend>'+
							'<input name="avatar" placeholder="avatar" '+
								'type="text" ng-model="user.avatar" required />'+
							'<label for="avatar" class="control-label">'+
								'<span ng-show="edit.avatar.$invalid">avatar</span>'+
								'<span class="error" ng-show="edit.avatar.$error.required">*</span>'+
							'</label><br />'+
							'<input name="email" placeholder="email" '+
								'type="email" ng-model="user.email" required />'+
							'<label for="email" class="control-label">'+
								'<span ng-show="edit.email.$invalid">email</span>'+
								'<span class="error" ng-show="edit.email.$error.required">*</span>'+
							'</label><br />'+
							'<input name="family_name" placeholder="family_name" '+
								'type="family_name" ng-model="user.family_name" required />'+
							'<label for="family_name" class="control-label">'+
								'<span ng-show="edit.family_name.$invalid">family_name</span>'+
								'<span class="error" ng-show="edit.family_name.$error.required">*</span>'+
							'</label><br />'+
							'<input name="given_name" placeholder="given_name" '+
								'type="given_name" ng-model="user.given_name" required />'+
							'<label for="given_name" class="control-label">'+
								'<span ng-show="edit.given_name.$invalid">given_name</span>'+
								'<span class="error" ng-show="edit.given_name.$error.required">*</span>'+
							'</label><br />'+
							'<input name="handle" placeholder="handle" '+
								'type="handle" ng-model="user.handle" required />'+
							'<label for="handle" class="control-label">'+
								'<span ng-show="edit.handle.$invalid">handle</span>'+
								'<span class="error" ng-show="edit.handle.$error.required">*</span>'+
							'</label><br />'+
							'<button ng-click="update()" ng-disabled="edit.$invalid || unchanged()">save</button>'+
							'<button ng-click="reset()" ng-disabled="unchanged()">undo</button>'+
							'<br />'+
							'<button ng-click="logout()">logout</button>'+
							'<hr />'+
							'<pre>valid = {{ edit.$valid | json }}</pre>'+
							'<pre>dirty = {{ edit.$dirty | json }}</pre>'+
							'<pre>model = {{ user | json }}</pre>'+
						'</form>'+
					'</div>',
				link: function( scope, element, attribute ){
					scope.reset();
					scope.fetch();
				}
			};
		}]

	);

	return module;
});
