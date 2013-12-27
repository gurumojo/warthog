Example Package
===============

- Gruntfile.js (task automation)
- package.json (package metadata)
- README.md (user guide)
- build/ (system sandbox and archive)
	- 0.0.0/ (symlink to system files)
	- \*.\*.\*/ (version hierarchies)
	- \*.\*.\*.tgz (version tarballs)
- instance/ (browser target directory)
	- \*.\*.\*.html (version hypertext)
	- index.html (hypertext application)
- system/ (development files)
	- css/ (style sheets)
		- main.css (web app styles)
		- qunit.css (QUnit styles)
	- doc/ (source documentation)
		- [placeholder]
	- img/ (image library)
		- favicon.ico (shortcut icon)
		- icon.png (apple touch icon)
		- loading.gif (progress indicator)
	- lib/ (external libraries)
		- qunit.js (Node module qunit)
		- require.js (Node module requirejs)
		- underscore.js (Node module underscore)
	- src/ (application root)
		- main.js (application executable)
		- lib/ (internal libraries)
			- example.js (AMD object constructor)
			- initialize.js (application bootstrap)
		- test/ (unit and functional tests)
			- jasmine.js (test config)
			- qunit.js (test config)
			- jasmine/ (Jasmine tests)
				- example.js (spec for src/lib/example.js)
				- index.html (test runner)
				- initialize.js (test harness)
			- qunit/ (QUnit tests)
				- example.js (spec for src/lib/example.js)
				- index.html (test runner)
				- initialize.js (test harness)


-------
Install
-------

Virtual environments provided by [Nave](https://github.com/isaacs/nave) make managing dependencies a breeze:

>`nave use stable`

This creates a session running the most recent stable branch of [Node](http://nodejs.org/).  It is also possible to request a specific numbered version.

Then a global install of the grunt-cli utility within this virtual environment leaves the rest of your filesystem untouched:

>`npm install -g grunt-cli`

Otherwise, use the local copy pulled from [NPM](https://npmjs.org/) during the dependency install process.  Simply substitute "`node_modules/grunt-cli/bin/grunt`" as necessary wherever the "`grunt`" command is referred to within this document.

Once your preferred node version is installed and the example package archive has been extracted, running the following command from within the example directory will install all the dependencies declared within the package.json file.

>`npm install`


-----
Usage
-----

The example package may be run from the command line using Node.  Source file documentation may be viewed in a web browser served by the grunt-contrib-connect plugin.  Various build related tasks are also available via [Grunt](http://gruntjs.com/).


### Run the application build tasks

The default Grunt task will clean temporary files, build [JSDoc](http://usejsdoc.org/) API documentation from inline comments, perform [JSHint](http://jshint.com/) and [CSSLint](http://csslint.net/) code quality checks, run [QUnit](http://qunitjs.com/) assertion testing, and then use various grunt-contrib-*, other NPM, and custom plugins to test, combine and minimize application code into a build using the version detailed in package.json:

>`grunt`

This task will print out available build tags.

>`grunt tag`

This task will update the package build environment.

>`grunt tag:0.0.1`

This task will build the requested semantic version.

>`grunt build:tag:0.0.1`

This alias task will run CSSLint, JSHint and QUnit:

>`grunt test`


### Run individual tasks

This task creates a tagged build folder, tarball, and HTML:

>`grunt build`

This task deletes documentation, package files, temporary files:

>`grunt clean`

This task bundles the application into a gzipped tarball:

>`grunt compress`

This task combines code bundles into single files:

>`grunt concat`

This task provides other tasks a simple web server on port 8000:

>`grunt connect`

This task copies system assets into the build path:

>`grunt copy`

This task performs style quality checks:

>`grunt csslint`

This task minimizes style file size:

>`grunt cssmin`

This task minimizes HTML file size:

>`grunt htmlmin`

This task builds API documentation from inline comments:

>`grunt jsdoc`

This task performs code quality checks:

>`grunt jshint`

This task runs unit tests:

>`grunt qunit`

This task substitutes semantic version strings in files:

>`grunt replace`

This task runs the r.js optimizer:

>`grunt requirejs`

This task tags the working environment to use a specific build:

>`grunt tag`

This task minimizes application code:

>`grunt uglify`

This task runs a configured task whenever project code changes:

>`grunt watch`


### Run the default application on the CLI

The example application runs on the command line:

>`node system/src/main`


### Run the web server over port 8000

The grunt-contrib-connect plugin will serve up pages until the process is killed:

>`grunt connect:server:keepalive`

Then point a web browser at the example application:

>[http://localhost:8000/instance/](http://localhost:8000/instance/)

...or the system documentation:

>[http://localhost:8000/system/doc/](http://localhost:8000/system/doc/)


-------------
Documentation
-------------

- [Nave](https://github.com/isaacs/nave) - Virtual Environments for Node
- [Node](http://nodejs.org/) - V8 Javascript Platform
- [NPM](https://npmjs.org/) - Node Packaged Modules
- [Grunt](http://gruntjs.com/) - JavaScript Task Runner
- [JSDoc](http://usejsdoc.org/) - Inline Documentation Processor
- [JSHint](http://jshint.com/) - Code Quality Tool
- [QUnit](http://qunitjs.com/) - Unit Testing Framework
- [CSSLint](http://csslint.net/) - Style Analysis
- [SemVer](http://semver.org/) - Semantic Versioning
- [AMD API](https://github.com/amdjs/amdjs-api/wiki/AMD) - Asynchronous Module Definition
- [RequireJS](http://requirejs.org/) - File and Module Loader
- [Underscore](http://underscorejs.org/) - Utility Belt Library

