module.exports = function( grunt ){

  var fs = require('fs');
  var semver = require('semver');
  var spawn = require('child_process').spawn;
  var stripcolorcodes = require('stripcolorcodes');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    build: {
      tag: {
        options: {
          version: '<%= pkg.version %>'
        },
        src: ['package.json']
      }
    },
    clean: {
      doc: ['system/doc/**/*', '!system/doc/.gitignore'],
      dot: ['build/<%= pkg.version %>/**/.*.sw[a-z]', 'build/<%= pkg.version %>/**/.gitignore'],
      ext: ['build/<%= pkg.version %>/{doc,img,html,json}'],
      src: ['build/<%= pkg.version %>*', 'instance/<%= pkg.version %>.html']
    },
    compress: {
      pkg: {
        options: {
          archive: 'build/<%= pkg.version %>.tgz'
        },
        src: ['build/<%= pkg.version %>/**', 'instance/index.html']
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      lib: {
        src: ['system/lib/*.js'],
        dest: 'build/<%= pkg.version %>/lib/exports.js'
      }
    },
    connect: {
      server: {
        options: {
          hostname: '*'
        }
      },
      e2e: {
        options: {
          hostname: '*',
          port: 8888
        }
      }
    },
    copy: {
      system: {
        expand: true,
        cwd: 'system/',
        src: ['css/**', 'img/**', 'lib/**'],
        dest: 'build/<%= pkg.version %>/'
      },
      instance: {
        expand: true,
        cwd: 'instance/',
        src: ['index.html'],
        dest: 'instance/',
        rename: function(dest, src){
          return dest +'<%= pkg.version %>.html'
        }
      }
    },
    csslint: {
      src: {
        options: {
          'adjoining-classes': false,
          'empty-rules': false,
          ids: false,
          import: false,
          important: false,
          'overqualified-elements': false,
          'qualified-headings': false,
          'unique-headings': false,
          'unqualified-attributes': false,
          'vendor-prefix': false,
          'box-model': false
        },
        src: ['system/css/**/*.css']
      }
    },
    cssmin: {
      system: {
        options: {
          processImport: false,
          report: 'gzip'
        },
        expand: true,
        cwd: 'system/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/<%= pkg.version %>/css/',
        //ext: '.min.css'
      }
    },
    htmlmin: {
      system: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true
        },
        files: {
          'instance/<%= pkg.version %>.html': 'instance/<%= pkg.version %>.html'
        },
      }
    },
    jasmine: {
      src: {
        src: 'system/src/test/jasmine.js',
        options: {
          keepRunner: true,
          outfile: 'system/src/test/jasmine/index.html',
          specs: 'system/src/test/jasmine/unit/*.js',
          //template: require('grunt-template-jasmine-requirejs'),
          template: require('./system/src/test/jasmine/template.js'),
          templateOptions: {
            //requireConfigFile: 'system/src/test/jasmine.js'
          }
        }
      },
      ng: {
        src: 'system/src/test/example.js',
        options: {
          keepRunner: true,
          outfile: 'system/src/test/example/index.html',
          specs: 'system/src/test/example/unit/*.js',
          //helpers: 'system/lib/ng*.js',
          template: require('./system/src/test/example/template.js'),
          templateOptions: {
			require: ['ngDefine', 'angular', 'angular-mocks', 'angular-route'],
            callback: function(){ /* onLoad */ }
          }
        }
      }
    },
    jsdoc: {
      src: ['README.md', 'system/src/main.js', 'system/src/lib/*/**/*.js'],
      options: {
        destination: 'system/doc/'
      }
    },
    jshint: {
      src: ['system/src/**/*.js'],
      options: {
        ignores: ['system/src/test/**'],
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    karma: {
      ng: {
        options: {
          frameworks: ['jasmine'],
          reporters: ['progress'],
          port: 9876,
          colors: true,
          browsers: ['PhantomJS'],
          captureTimeout: 10000,
          files: [
            'system/lib/require.js',
            //'system/lib/angular.js',
            //'system/lib/ngDefine.js',
            'system/src/test/example.js',
            //'system/src/test/example/unit/*'
          ],
          singleRun: true,
          //preprocessors: {
          //  '**/*.html': 'html2js'
          //},
          plugins: [
              'karma-jasmine',
              'karma-phantomjs-launcher',
              //'karma-html2js-preprocessor'
          ]
        }
      }
    },
    ngr: {
      minify: {
        options: {
          appDir: 'system',
          baseUrl: 'src/lib',
          dir: 'build/<%= pkg.version %>',
          mainConfigFile: 'system/src/main.js',
          modules: [
            {
              name: 'core/cli'
            },
            {
              name: 'core/dom'
            },
            {
              name: 'example/router',
              exclude: ['angular']
            }
          ],
          //optimize: 'none', //'uglify' by default
          optimizeCss: 'none', //'standard', //'standard.keepLines' by default
          cssImportIgnore: 'bootstrap/2.3.1/min.css, bootstrap/2.3.1/responsive/min.css',
          skipDirOptimize: true, // skip optimization on non-build files
          keepBuildDir: false, // delete the build directory before each run
          removeCombined: true, // eliminate duplicate (combined) files from build
          preserveLicenseComments: false, // preserve only JSDoc-style @license
        }
      }
    },
    protractor: {
      options: {
        configFile: 'system/src/test/example/e2e/config.js',
        //keepAlive: true,
        //debug: true,
        args: {}
      },
      test: {
        options: {
          //specs: ['system/src/test/example/e2e/scenario.js'],
          args: {}
        }
      }
    },
    qunit: {
      src: ['system/src/test/qunit/**/*.html']
    },
    replace: {
      build: {
        options: {
          patterns: [{
            match: /build\/0\.0\.0/g,
            replacement: 'build/<%= pkg.version %>'
          }]
        },
        files: [
          //{src: ['instance/<%= pkg.version %>.html'], dest: './'},
          {src: ['instance/index.html'], dest: 'instance/<%= pkg.version %>.html'},
          {src: ['build/<%= pkg.version %>/src/main.js'], dest: './'}
        ]
      },
      tag: {
        options: {
          patterns: [{
            match: /build\/\d\.\d\.\d/g,
            replacement: function(){
              return 'build/'+ (grunt.task.current.args[0] || '0.0.0');
            }
          }]
        },
        files: [
          {src: ['instance/index.html'], dest: './'},
          {src: ['system/src/main.js'], dest: './'}
        ]
      },
      zero: {
        options: {
          patterns: [{
            match: /build\/\d\.\d\.\d/g,
            replacement: 'build/0.0.0',
            expression: true
          }]
        },
        files: [
          {src: ['instance/index.html'], dest: './'},
          {src: ['system/src/main.js'], dest: './'}
        ]
      }
    },
    rjs: {
      compile: {
        options: {
          appDir: 'system',
          baseUrl: 'src/lib',
          dir: 'build/<%= pkg.version %>',
          mainConfigFile: 'system/src/main.js',
          modules: [
            {
              name: 'core/cli'
              //exclude: ['crypto']
            },
            {
              name: 'core/dom'
              //exclude: ['crypto']
            }
          ],
          //optimize: 'none', //'uglify' by default
          optimizeCss: 'standard', //'standard.keepLines' by default
          paths: {
            main: '../main'
          },
          cssImportIgnore: 'bootstrap/2.3.1/min.css, bootstrap/2.3.1/responsive/min.css',
          skipDirOptimize: true, // skip optimization on non-build files
          keepBuildDir: false, // delete the build directory before each run
          //removeCombined: true, // eliminate duplicate (combined) files from build
          preserveLicenseComments: false, // preserve only JSDoc-style @license
        }
      }
    },
    tag: {
      options: {
        version: '<%= pkg.version %>'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      lib: {
        expand: true,
        cwd: 'system/',
        src: ['src/main.js', 'lib/**/*.js', '!**/md5.js', '!**/xml2json.js'],
        dest: 'build/<%= pkg.version %>'
      }
    },
    watch: {
      files: ['README.md', '<%= jshint.src %>'],
      tasks: ['unit']
    },
    selenium: {
      webdriver: {
      	//executable: '',
      	//keyword: ''
      }
    }
  });

  /**
   * @summary Command Runner
   * @see http://stackoverflow.com/questions/14458508/node-js-shell-command-execution
   * @requires {object} child_process#spawn
   * @param {string} cmd - shell executable
   * @param {array} args - command arguments
   * @param {function} done - output callback
   * @return {object} process
   * @example
   *  shell('ls', ['-l'], function(text){ console.log(text); });
   *  shell('hostname', [], console.log);
   */
  function shell(cmd, args, done){
    var child = spawn(cmd, args);
    var stdout = '';
    child.stdout.on('data', function(buffer){ stdout += buffer.toString(); });
    child.stdout.on('close', function(){ done(stdout); });
    return child;
  }

  /**
   * @summary
   *  Kill Process
   * @requires
   *  {function} shell
   * @param
   *  {string} pid - process to kill
   * @param
   *  {function} done - callback function
   * @example
   *  `kill -9 [pid]`
   */
  function kill(pid, done){
    var kill = shell('kill', ['-9', pid.trim()], function(){
      grunt.verbose.writeln('kill -9', pid);
      try {
        done();
      } catch(x) {
        grunt.warn(x.stack);
      }
    });
    kill.stderr.on('data', function(data){
      grunt.log.warn(data);
    });
  }

  /**
   * @summary
   *  Process Snapshot for User
   * @requires
   *  {function} shell
   * @param
   *  {object} destination - process pipe endpoint
   * @example
   *  `ps u | grep -v grep | [destination]`
   */
  function psu(destination){
    var filter = shell('grep', ['-v', 'grep'], function(result){
      grunt.verbose.write(result);
    });
    filter.on('close', function(code, signal){
      grunt.verbose.writeln('filter: { exit:', code, ', signal:', signal, '}');
      destination.stdin.end();
    });
    filter.stdout.on('data', function(data){
      destination.stdin.write(data);
    });
    var ps = shell('ps', ['u'], function(){});
    ps.on('close', function(code, signal){
      filter.stdin.end();
    });
    ps.stdout.on('data', function(data){
      filter.stdin.write(data);
    });
  }

  /**
   * @summary Selenium WebDriver
   * @see protractor
   * @requires {function} psu
   */
  grunt.registerMultiTask('selenium', 'Selenium WebDriver', function(){
    var selenium, grep, awk;
    var task = this.args[0];
    var done = this.async();
    var options = this.options({
      executable: 'node_modules/protractor/bin/webdriver-manager',
      keyword: 'protractor/selenium'
    });
    grunt.log.ok(task);
    switch(task){
      case 'update':
        /* falls through */
      case 'status':
        selenium = shell(options.executable, [task], function(result){
          grunt.log.write(result);
          done();
        });
        break;
      case 'start':
        selenium = shell(options.executable, [task], function(result){
          grunt.verbose.write(result);
        });
        grep = shell('grep', ['-c', options.keyword], function(result){
          if (result > 0) {
            grunt.verbose.writeln(options.executable, 'process', selenium.pid);
            done();
          } else {
            grunt.warn('Failed to start', options.executable, 'process.');
          }
        });
        setTimeout(function(){
          psu(grep);
        }, 1000);
        break;
      case 'stop':
        //`awk '{print substr($2, 0)}'`
        awk = shell('awk', ['{print substr($2, 0)}'], function(process){
          kill(process, done);
        });
        grep = shell('grep', [options.keyword], function(result){
          if (result) {
            grunt.verbose.writeln(result);
          } else {
            grunt.warn('Failed to find '+ options.keyword +' process.');
          }
        });
        grep.stdout.on('data', function(data){
          awk.stdin.write(data);
        });
        grep.on('close', function(code, signal){
          grunt.verbose.writeln('grep: { exit:', code, ', signal:', signal, '}');
          awk.stdin.end();
        });
        psu(grep);
        break;
      default:
        grunt.warn('Unsupported argument.');
    }
  });
    //var psTree = require('ps-tree');
    //var spawn = require('child_process').spawn;
    //    psTree(selenium.pid, function(error, children){
    //      if(children.length){
    //        grunt.task.run(['protractor:test']);
    //      } else {
    //        grunt.log.write(result);
    //      }
    //      setTimeout(function(){
    //        children.forEach(function(child){
    //          spawn('kill', ['-9', child.PID]);
    //        });
    //      }, 10000);
    //    });

  /**
   * @summary Build Task
   * @see http://semver.org/
   * @todo implement exception handling
   */
  grunt.registerMultiTask('build', 'Generate a semantic version build', function(){
    var options = this.options({
      source: this.filesSrc,
      version: '0.0.0'
    });
    var done = this.async();
    var tag = options.version;
    var arg = this.args[0];
    var src = options.source.filter(function(file){
      if(!grunt.file.exists(file)){
        grunt.warn('Source file "'+ file +'" not found.');
        return false;
      } else {
        if(semver.valid(arg) && semver.gt(arg, '0.0.0')){
          grunt.verbose.writeln('Using version '+ arg +' from command line input....');
        } else {
          arg = tag;
          grunt.verbose.writeln('Using version '+ arg +' from package.json....');
        }
        // replace version string in file
        grunt.file.write(file, grunt.file.read(file).replace(tag, arg));
        // launch child process to complete build with updated config
        var child = grunt.util.spawn({
          cmd: 'grunt',
          args: ['version']
        }, function(error, result, code){
          if(error){
            console.error(error.stack.substr(error.stack.lastIndexOf('Error: ')));
            done(false);
          } else {
            var path = 'build/'+ arg;
            if(grunt.file.isDir(path)){
              grunt.file.write(path +'/build.txt', stripcolorcodes(result.stdout));
              //result.stdout.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '')
              grunt.log.ok('Build written to '+ fs.realpathSync(path));
              done();
            } else {
              grunt.warn('Build configuration error('+ code +').');
              done(false);
            }
          }
        });
        return true;
      }
    });
  });

  /**
   * @summary JSDoc Task
   * @see http://usejsdoc.org/about-commandline.html
   * @todo publish as NPM package a la grunt-contrib-*
   */
  grunt.registerMultiTask('jsdoc', 'Generate HTML documentation with JSDoc', function(){
    var options = this.options({
      executable: 'node_modules/jsdoc/jsdoc.js',
      source: this.filesSrc
    });
    var exec = options.executable;
    var args = options.source;
    var done = this.async();
    var path = './out';
    if(!grunt.file.exists(exec)){
      grunt.warn('JSDoc executable not found.');
      done(false);
    } else {
      if(args.length > 1 || args[0] !=='README.md'){
        if(options.template){
          args.push('-t');
          args.push(options.template);
        }
        if(options.configure){
          args.push('-c');
          args.push(options.configure);
        }
        if(options.encoding){
          args.push('-e');
          args.push(options.encoding);
        }
        if(options.destination){
          args.push('-d');
          args.push(options.destination);
        }
        if(options.recurse){
          args.push('-r');
        }
        if(options.tutorials){
          args.push('-u');
          args.push(options.tutorials);
        }
        if(options.private){
          args.push('-p');
        }
        if(options.lenient){
          args.push('-l');
        }
        if(options.query){
          args.push('-q');
          args.push(options.query);
        }
        grunt.util.spawn({cmd: exec, args: args}, function(error){
          if(error){
            //done(grunt.util.error(error));
            console.error(error.stack.substr(error.stack.lastIndexOf('Error: ')));
            done(false);
          } else {
            if(options.destination){
              path = options.destination;
            }
            if(grunt.file.isDir(path)){
              grunt.log.ok('JSDoc written to '+ path);
              done();
            } else {
              grunt.warn('JSDoc source file configuration error.');
              done(false);
            }
          }
        });
      } else {
        grunt.warn('JSDoc requires source file configuration.');
        done(false);
      }
    }
  });

  /**
   * @summary Tag Task
   */
  grunt.registerTask('tag', 'Set environment to a specific build', function(){
    var options = this.options({
      version: '0.0.0'
    });
    var tag = options.version;
    var arg = this.args[0];
    if(semver.valid(arg)){
      if(grunt.file.isDir('build/'+ arg)){
        grunt.verbose.writeln('Using version '+ arg +' from command line input....');
      } else if(grunt.file.isDir('build/'+ tag)){
        arg = tag;
        grunt.verbose.writeln('Using version '+ arg +' from package.json....');
      } else {
        grunt.warn('Build not found.');
      }
      grunt.task.run(['replace:tag:'+ arg]);
      grunt.log.ok('Published tag: '+ arg);
    } else {
      if(!arg){
        var dir = grunt.file.expand({cwd: 'build', filter: 'isDirectory'}, '*');
        grunt.log.writeln('Build tags:');
        for(var i in dir){
          grunt.log.ok(dir[i]);
        }
      } else {
        grunt.warn('Invalid tag.');
      }
    }
  });

  /**
   * @summary AngularJS Optimization
   */
  grunt.registerMultiTask('ngr', 'Optimization with r.js via ngDefine', function() {
    var done = this.async();
    var ngr = require('./bower_components/requirejs-angular-define/src/ngr.js');
    ngr.optimize(this.data.options, function(){
      done('success');
    }, function(e){
      console.log('Error during minify: ', e);
      done(new Error('With failures: ' + e));
    });
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('doc', [
    'clean:doc',
    'jsdoc'
  ]);
  grunt.registerTask('e2e', [
    'connect:e2e',
    'selenium:webdriver:start',
    'protractor',
    'selenium:webdriver:stop'
  ]);
  grunt.registerTask('test', [
    'csslint',
    'jshint',
    'unit',
    'e2e'
  ]);
  grunt.registerTask('unit', [
    'jasmine',
    'qunit'
  ]);
  grunt.registerTask('version', [
    //'rjs',
    'ngr',
    'replace:build',
    'clean:ext',
    //'copy',
    //'concat',
    //'uglify',
    'cssmin',
    'htmlmin',
    'clean:dot',
    'compress'
  ]);
  grunt.registerTask('default', [
    'clean',
    'jsdoc',
    'test',
    'build'
  ]);
};
