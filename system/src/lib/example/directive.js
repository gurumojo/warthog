/**
 * @summary
 *  AngularJS Directive
 * @description
 *  The main application directive collection.
 */
ngDefine('example.directive', [

	// dependencies

], function(module){
	'use strict';

	/**
	 * AngularJS Directive
	 */
	module.directive('appDebug',
	
		[function(){
	
			/**
			 * app-debug
			 *
			 * declare element properties and behaviors
			 * with a directiveDefinitionObject
			 */
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
	
	).directive('appVersion',
	
		['meta', function( meta ){
	
			/**
			 * app-version
			 *
			 * update DOM and register listeners
			 * with a postLink method
			 */
			return function( scope, element, attribute, controller ){
				element.css({
					opacity: 0.5,
					filter: 'alpha(opacity=50)',
					zoom: 1
				});
				element.text(meta.title +' '+ meta.version);
			};
		}]
	
	).directive('inputTextEditor',
	
		[function(){
	
			/**
			 * input-text-editor
			 *
			 * a contentEditable directiveDefinitionObject to allow editing of a
			 * child span via text input, triggered on dblclick, released on blur
			 *
			 * @param string ng-model "parent.child" dotted scope object reference
			 */
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
	
	).directive('textareaEditor',
	
		[function(){
	
			/**
			 * textarea-editor
			 *
			 * a contentEditable directiveDefinitionObject
			 *
			 * @param string ng-model "parent.child" dotted scope object reference
			 */
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
	
	).directive('userSession',
	
		[function(){
	
			/**
			 * user-session
			 *
			 * declare element properties and behaviors
			 * with a directiveDefinitionObject
			 */
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

});
