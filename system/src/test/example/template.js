'use strict';

var template = __dirname +'/template.html';
var require = __dirname +'/../../../lib/require.js';

exports.process = function(grunt, task, context){
  var source = grunt.file.read(template);
  task.copyTempFile(require, 'require.js');
  return grunt.util._.template(source, context);
};
