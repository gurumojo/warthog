Example Package
===============

- Gruntfile.js (task automation)
- package.json (package metadata)
- README.md (user guide)
- build/ (target sandbox and archive)
	- 0.0.0/ (symlink to system files)
	- \*.\*.\*/ (version hierarchies)
	- example_\*.\*.\*.tgz (version archives)
- instance/ (browser target directory)
	- index.html (hypertext application)
- system/ (development files)
	- bin/ (executable scripts)
		- build.sh (r.js wrapper)
	- doc/ (source documentation)
		- [placeholder]
	- etc/ (project configuration)
		- build.js (optimizer instructions)
	- lib/ (external libraries)
		- require.js (Node module requirejs)
		- underscore.js (Node module underscore)
	- src/ (application root)
		- example.js (AMD object constructor)
		- html.js (RequireJS in HTML)
		- main.js (RequireJS in Node)
		- css/ (style sheets)
			- main.css (web app styles)
		- img/ (image library)
			- favicon.ico (shortcut icon)
			- icon.png (apple touch icon)
			- loading.gif (progress indicator)
- test/ (unit and functional tests)
	- example.html (QUnit test runner)


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

A default Grunt task will build [JSDoc](http://usejsdoc.org/) API documentation from inline comments, [JSLint](http://jslint.com/) code quality checks, [QUnit](http://qunitjs.com/) assertion testing, and then use included grunt-contrib-concat and grunt-contrib-uglify plugins to combine and minimize application code:

>`grunt`


### Run the syntax check and unit tests

This alias task will run both JSLint and QUnit:

>`grunt test`


### Run individual tasks

This task combines code into a single file:

>`grunt concat`

This task provides other tasks a simple web server on port 8000:

>`grunt connect`

This task builds API documentation from inline comments:

>`grunt jsdoc`

This task performs code quality checks:

>`grunt jshint`

This task runs unit tests:

>`grunt qunit`

This task minimizes application code:

>`grunt uglify`

This task runs the "`grunt test`" task whenever project code changes:

>`grunt watch`


### Run the default application on the CLI

The example application runs on the command line:

>`node src/main`


### Run the web server over port 8000

The grunt-contrib-connect plugin will serve up pages until the process is killed:

>`grunt connect:server:keepalive`

Then point a web browser to [http://localhost:8000/instance/](http://localhost:8000/instance/).


-------------
Documentation
-------------

- [Nave](https://github.com/isaacs/nave) - Virtual Environments for Node
- [Node](http://nodejs.org/) - V8 Javascript Platform
- [NPM](https://npmjs.org/) - Node Packaged Modules
- [Grunt](http://gruntjs.com/) - JavaScript Task Runner
- [JSDoc](http://usejsdoc.org/) - Inline Documentation Processor
- [JSLint](http://jslint.com/) - Code Quality Tool
- [QUnit](http://qunitjs.com/) - Unit Testing Framework
- [AMD API](https://github.com/amdjs/amdjs-api/wiki/AMD) - Asynchronous Module Definition
- [RequireJS](http://requirejs.org/) - File and Module Loader
- [Underscore](http://underscorejs.org/) - Utility Belt Library

