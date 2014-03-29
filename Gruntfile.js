module.exports = function(grunt) {

  // Load the Npm tasks configured for this project:
  // connect: webserver
  // watch: watch file changes + livereload
  // compass
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 9008,
          base: 'html',
          livereload: true,
          open: true
        },
      },
    },

    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['**/*.html']
      },
      css: {
        files: ['scss/*.scss'],
        tasks: ['compass'],
      },
    },

    compass: {
      dev: {
        options: {
          sassDir: 'scss',
          cssDir: 'html/css',
          environment: 'development',
          outputStyle: 'expanded',
          debugInfo: true,
        }
      }
    }
  });


  // Default task(s).
  grunt.registerTask('default', []);
  grunt.registerTask('dev', ['connect', 'watch']);

};