module.exports = function( grunt ){

  var fs = require('fs');
  var semver = require('semver');
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
      dot: ['build/<%= pkg.version %>/**/.*.sw[a-z]'],
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
          'vendor-prefix': false
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
        options: {
          keepRunner: true,
          outfile: 'system/src/test/jasmine/index.html',
          specs: 'system/src/test/jasmine/**/*.js',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'system/src/test/jasmine.js'
          }
        },
        //src: 'system/src/lib/**/*.js'
      }
    },
    jsdoc: {
      src: ['README.md', 'system/src/main.js', 'system/src/lib/**/*.js'],
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
          {src: ['instance/index.html'], dest: './'},
          {src: ['system/src/main.js'], dest: './'}
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
    requirejs: {
      compile: {
        options: {
          appDir: 'system',
          baseUrl: 'src/lib',
          dir: 'build/<%= pkg.version %>',
          mainConfigFile: 'system/src/main.js',
          modules: [
            {
            //  name: 'underscore'
            //},
            //{
            //  name: 'ranch',
            //  exclude: ['underscore']
            //},
            //{
            //  name: '<%= pkg.name %>',
            //  exclude: ['underscore']
            //},
            //{
              name: 'initialize',
            //  exclude: ['ranch']
            //  //exclude: ['underscore', 'ranch', '<%= pkg.name %>']
            //},
            //{
            //  name: 'main',
            //  //include: ['initialize', 'underscore', '<%= pkg.name %>'],
            //  exclude: ['initialize', 'underscore', '<%= pkg.name %>', 'ranch']
            }
          ],
          //optimize: 'none', //'uglify' by default
          optimizeCss: 'standard', //'standard.keepLines' by default
          paths: {
            main: '../main'
          },
          cssImportIgnore: 'bootstrap/2.3.1/min.css, bootstrap/2.3.1/responsive/min.css',
          //skipDirOptimize: true, // skip optimization on non-build files
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
        src: ['lib/**/*.js', 'src/main.js'],
        dest: 'build/<%= pkg.version %>'
      }
    },
    watch: {
        files: ['README.md', '<%= jshint.src %>'],
        tasks: ['test']
    }
  });

  /**
   * @summary Command Runner
   * @see http://stackoverflow.com/questions/14458508/node-js-shell-command-execution
   * @param {string} cmd - shell executable
   * @param {array} args - command arguments
   * @param {function} done - output callback
   * @example
   *  shell('ls', ['-l'], function(text){ console.log(text); });
   *  shell('hostname', [], function(text){ console.log(text); });
   */
  function shell(cmd, args, done){
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var stdout = '';
    child.stdout.on('data', function(buffer){ stdout += buffer.toString(); });
    child.stdout.on('end', function(){ done(stdout); });
  }

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
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('doc', [
    'clean:doc',
    'jsdoc'
  ]);
  grunt.registerTask('test', [
    'csslint',
    'jshint',
    'jasmine',
    'qunit'
  ]);
  grunt.registerTask('version', [
    'replace:build',
    'requirejs',
    //'concat',
    'copy',
    'uglify',
    'cssmin',
    'htmlmin',
    'clean:dot',
    'compress',
    'replace:zero'
  ]);
  grunt.registerTask('default', [
    'clean',
    'jsdoc',
    'test',
    'build'
  ]);
};
