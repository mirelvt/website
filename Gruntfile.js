module.exports = function(grunt) {

  // Load the npm tasks configured for this project:
  // * sass

  grunt.loadNpmTasks('grunt-harp');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'build',
          livereload: true,
          open: true
        },
      }
    },

    harp: {
      server: {
        server: false,
        source: './'
      },
      dist: {
        source: './',
        dest: 'build'
      },
    },

    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['public/**/*.ejs'],
        tasks: ['harp']
      },
      css: {
        files: ['scss/*.scss'],
        tasks: ['sass:dev', 'harp']
      },
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
          dest: 'public/css',
          ext: '.min.css'
        }]
      },
      deploy: {
        options: {
          style: 'compressed',
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },

     clean: ['build/css/']
  });

   // Default task(s).
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('deploy', ['clean', 'sass:deploy', 'harp']);
};