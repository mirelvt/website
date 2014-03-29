module.exports = function(grunt) {

  // Load the Npm tasks configured for this project:
  // connect: webserver
  // watch: watch file changes + livereload
  // sass
  // xsltproc: for converting xsl to html
  // clean
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-xsltproc');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      dev: {
        options: {
          port: 9008,
          base: 'html',
          livereload: true,
          open: true
        },
      },
      prod: {
        options: {
          port: 9009,
          base: 'html',
          keepalive: true,
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
        files: ['html/*.html'],
      },
      css: {
        files: ['scss/*.scss'],
        tasks: ['sass:dev'],
      },
      shtml: {
        files: ['**/*.shtml'],
        tasks: ['xsltproc'],
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: true,
          debugInfo: true
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'html/css',
          ext: '.min.css'
        }]
      },
      prod: {
        options: {
          style: 'compressed',
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'html/css',
          ext: '.min.css'
        }]
      }
    },

    xsltproc: {
      options: {
        stylesheet: 'base.xsl'
      },
      compile: {
        files: [{
          expand: true,
          cwd: '.',
          src: '*.shtml',
          dest: 'html',
          ext: '.html'
        }]
      }
    },

    clean: ["html/css"]
  });

  // Default task(s).
  grunt.registerTask('prod', ['clean', 'sass:prod', 'xsltproc', 'connect:prod']);
  grunt.registerTask('dev', ['connect:dev', 'watch']);

};