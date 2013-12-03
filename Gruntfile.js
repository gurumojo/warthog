module.exports = function( grunt ){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'var/<%= pkg.name %>.js'
      }
    },
    connect: {
      //uses_defaults: {}
      server: {
        options: {
          base: '.'
        }
      }
    },
    jsdoc: {
      files: ['README.md', 'src'],
      options: {
        destination: './jsdoc'
      }
    },
    jshint: {
      files: ['src/**/*.js', 'test/**/*.js'],
      options: {
        // JSHint default overrides
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
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'var/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
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

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jsdoc', 'jshint', 'qunit']);
  grunt.registerTask('default', ['jsdoc', 'jshint', 'qunit', 'concat', 'uglify']);

};
