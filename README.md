Example Package
===============
A full stack [Node](http://nodejs.org/) application template using [Grunt](http://gruntjs.com/), [Bower](http://bower.io/), [RequireJS](http://requirejs.org/) and [AngularJS](https://docs.angularjs.org/api).

-------
Install
-------

Virtual environments provided by [Nave](https://github.com/isaacs/nave) make managing dependencies a breeze:

>`nave use stable`

This creates a session running the most recent stable branch of Node.  It is also possible to request a specific numbered version.

Then a global install of the grunt-cli utility within this virtual environment leaves the rest of your filesystem untouched:

>`npm install -g grunt-cli`

Otherwise, use the local copy pulled from [NPM](https://npmjs.org/) during the dependency install process.  Simply substitute "`node_modules/grunt-cli/bin/grunt`" as necessary wherever the "`grunt`" command is referred to within this document.

Once your preferred node version is installed and the example package archive has been extracted, running the following command from within the example directory will install all the dependencies declared within the package.json and bower.json files.

>`npm install`


-----
Usage
-----

The example package may be run from the command line using Node.  Source file documentation may be viewed in a web browser served by the grunt-contrib-connect plugin.  Various build related tasks are also available via Grunt.


### Run the application build tasks

The default Grunt task will clean temporary files, build [JSDoc](http://usejsdoc.org/) API documentation from inline comments, perform [JSHint](http://jshint.com/) and [CSSLint](http://csslint.net/) code quality checks, run [Jasmine](http://jasmine.github.io/), [QUnit](http://qunitjs.com/) and [Protractor](https://github.com/angular/protractor) assertion testing, then use various grunt-contrib-*, other NPM, and custom plugins to combine and minimize application code into a build at the version detailed in package.json:

>`grunt`

The doc alias deletes existing files and runs JSDoc to generate HTML documentation:

>`grunt doc`

The test alias runs code quality checks, unit tests and end-to-end scenarios:

>`grunt test`

The e2e alias starts a connect web server and a selenium webdriver to run protractor end-to-end test scenarios:

>`grunt e2e`

The unit alias runs Jasmine and QUnit specs:

>`grunt unit`


### Run individual tasks

This task creates a tagged build folder, tarball, and HTML:

>`grunt build`

This task deletes documentation, package files, temporary files:

>`grunt clean`

This task bundles the application into a gzipped tarball:

>`grunt compress`

This task combines code bundles into single files:

>`grunt concat`

This task provides other tasks a simple web server:

>`grunt connect`

This task copies system assets into the build path:

>`grunt copy`

This task performs style quality checks:

>`grunt csslint`

This task minimizes style file size:

>`grunt cssmin`

This task minimizes markup file size:

>`grunt htmlmin`

This task runs Jasmine tests:

>`grunt jasmine`

This task builds API documentation from inline comments:

>`grunt jsdoc`

This task performs code quality checks:

>`grunt jshint`

This task runs the r.js optimizer for ngDefine modules:

>`grunt ngr`

This task runs protractor end-to-end tests:

>`grunt protractor`

This task runs QUnit tests:

>`grunt qunit`

This task substitutes semantic version strings in files:

>`grunt replace`

This task runs the r.js optimizer for AMD modules:

>`grunt rjs`

This task tags the working environment to use a specific build:

>`grunt tag`

This task minimizes application code:

>`grunt uglify`

This task runs a configured task whenever project code changes:

>`grunt watch`


### Run the default application on the CLI

The example application runs on the command line:

>`node system/src/main`


### Run the connect web server

The grunt-contrib-connect plugin will serve up pages until the process is killed:

>`grunt connect:server:keepalive`

Then point a web browser at the example application:

>[http://localhost:8000/instance/](http://localhost:8000/instance/)

...or the system documentation:

>[http://localhost:8000/system/doc/](http://localhost:8000/system/doc/)


### Minimize network traffic ###

Stats for initial load of the development version of instance/index.html:

>`14 requests | 891 KB transferred | 455 ms (load: 161 ms, DOMContentLoaded: 161 ms)`

Stats for initial load of the production version of instance/index.html:

>`6 requests | 212 KB transferred | 224 ms (load: 75 ms, DOMContentLoaded: 75 ms)`


-------------
Documentation
-------------

- [AMD API](https://github.com/amdjs/amdjs-api/wiki/AMD) - Asynchronous Module Definition
- [AngularJS](https://docs.angularjs.org/api) - Superheroic JavaScript Framework
- [Bower](http://bower.io/) - Client Package Manager
- [CSSLint](http://csslint.net/) - Style Quality Analysis
- [Grunt](http://gruntjs.com/) - JavaScript Task Runner
- [Jasmine](http://jasmine.github.io/) - Behavior Driven Development
- [JSDoc](http://usejsdoc.org/) - Inline Documentation Processor
- [JSHint](http://jshint.com/) - Code Quality Analysis
- [Nave](https://github.com/isaacs/nave) - Node Virtual Environments
- [Node](http://nodejs.org/) - V8 JavaScript Platform
- [NPM](https://npmjs.org/) - Server Package Manager
- [Protractor](https://github.com/angular/protractor) End-to-end Test Framework
- [QUnit](http://qunitjs.com/) - Unit Test Framework
- [RequireJS](http://requirejs.org/) - Asynchronous Module Loader
- [SemVer](http://semver.org/) - Semantic Version Utilities
- [Underscore](http://underscorejs.org/) - Utility Belt Library


----------
Filesystem
----------

- bower.json (client package metadata)
- Gruntfile.js (server task automation)
- LICENSE.md (license information)
- package.json (server package metadata)
- README.md (developer guide)
- build/ (system sandbox and archive)
	- 0.0.0/ (symlink to system files)
	- \*.\*.\*/ (version hierarchies)
	- \*.\*.\*.tgz (version tarballs)
- instance/ (browser target directory)
	- \*.\*.\*.html (version hypertext)
	- index.html (hypertext application)
- system/ (development files)
	- bin/ (helper scripts)
		- bugfix.sh (post-install helper)
		- postinstall.sh (post-install script)
	- css/ (style sheets)
		- main.css (web app styles)
		- qunit.css (QUnit styles)
	- doc/ (source documentation)
		- [placeholder]
	- html/ (template markup)
		- [placeholder]
	- img/ (image library)
		- favicon.ico (shortcut icon)
		- icon.png (apple touch icon)
		- loading.gif (progress indicator)
	- json/ (model data mocks)
		- user/ (authentication and profiles)
			- login (response stub)
			- logout (response stub)
			- profile (response stub)
	- lib/ (external library symlinks)
		- angular.js (Bower module angular)
		- angular-mocks.js (Bower module angular-mocks)
		- angular-route.js (Bower module angular-route)
		- ngDefine.js (Bower module requirejs-angular-define)
		- ngParse.js (Bower module requirejs-angular-define)
		- qunit.js (Node module qunit)
		- require.js (Node module requirejs)
		- underscore.js (Node module underscore)
	- src/ (application root)
		- main.js (application executable)
		- lib/ (internal libraries)
			- core/ (framework bootstrap)
				- cli.js (Node shell bindings)
				- dom.js (browser window bindings)
			- example/ (AngularJS application)
				- controller.js (object class code)
				- directive.js (smart markup)
				- filter.js (template helpers)
				- router.js (location path mapping)
				- service.js (singleton code)
		- test/ (unit and functional tests)
			- example.js (test config)
			- jasmine.js (test config)
			- qunit.js (test config)
			- example/ (AngularJS tests)
				- index.html (test runner)
				- template.html (runner template)
				- template.js (grunt-contrib-jasmine hook)
				- e2e/ (end to end scenarios for src/lib/example)
				- lib/ (Angular testing dependencies)
				- unit/ (module specs for src/lib/example)
			- jasmine/ (Jasmine tests)
				- index.html (test runner)
				- template.html (test runner template)
				- template.js (grunt-contrib-jasmine hook)
				- unit/ (module specs for src/lib/*.js)
			- qunit/ (QUnit tests)
				- Example.js (spec for src/lib/Example.js)
				- index.html (test runner)
				- initialize.js (test harness)

