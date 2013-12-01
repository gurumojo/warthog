Example Package
===============

Included in the example package:

- Gruntfile.js (task automation)
- package.json (package metadata)
- README.md (this file)
- src/
	- example.js (AMD object constructor)
	- main.js (RequireJS bootstrap)
- test/
	- example.html (QUnit test runner)

Install
-------
Once the example package archive has been extracted, running the following command from within the example directory will install all the dependencies declared within the package.json file.

`npm install`

Usage
-----
The example package may be run from the command line using node. Source file documentation may be viewed in a web browser served by the grunt-contrib-connect plugin. Various build related tasks are also available via grunt.

### Run the default build tasks
`grunt`


### Run the syntax check and unit tests
`grunt test`

### Run the default application on the CLI
`node src/main`

### Run the web server over port 8000
`grunt connect:server:keepalive`

Documentation
-------------

- [Node](http://nodejs.org/api/)
- [NPM](https://npmjs.org/)
- [Grunt](http://gruntjs.com/)
- [JSDoc](http://usejsdoc.org/)
- [QUnit](http://qunitjs.com/)
- [RequireJS](http://requirejs.org/)
- [Underscore](http://underscorejs.org/)

