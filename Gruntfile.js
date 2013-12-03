module.exports = function( grunt ){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
		files: ['build/<%= pkg.version %>'],
    },
    compress: {
      main: {
        options: {
          archive: 'build/<%= pkg.name %>_<%= pkg.version %>.tgz'
        },
        src: ['build/<%= pkg.version %>/**']
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['system/src/**/*.js'],
        dest: 'build/<%= pkg.version %>/src/<%= pkg.name %>.js'
      }
    },
    connect: {
      server: {
        options: {
          base: '.'
        }
      }
    },
    copy: {
      img: {
        expand: true,
        cwd: 'system/src/',
        src: ['img/**'],
        dest: 'build/<%= pkg.version %>/src/'
      },
      lib: {
        expand: true,
        cwd: 'system/',
        src: ['lib/**'],
        dest: 'build/<%= pkg.version %>'
      }
    },
    jsdoc: {
      files: ['README.md', 'system/src'],
      options: {
        destination: 'system/doc'
      }
    },
    jshint: {
      files: ['system/bin/**/*.js', 'system/src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'build/<%= pkg.version %>/src/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      files: ['README.md', '<%= jshint.files %>'],
      tasks: ['test']
    }
  });

  /**
   * JSDoc Grunt Task
   *
   * @see http://usejsdoc.org/about-commandline.html
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
        //grunt.log.writeln('# '+ exec +' '+ args.join(' '));
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

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-contrib-csslint');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-contrib-htmlmin');
  /** @todo aws npm install grunt-contrib-imagemin --save-dev */
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  //grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  //grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jsdoc', 'jshint', 'qunit']);
  grunt.registerTask('default', ['clean', 'jsdoc', 'jshint', 'qunit', 'concat', 'uglify', 'copy', 'compress']);

};
