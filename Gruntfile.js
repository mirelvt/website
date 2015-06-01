module.exports = function(grunt) {

  // Load the npm tasks configured for this project:
  // * sass, watch, clean,
  //* compressor (minify html and js),
  // * connect (used for live reload).
  // * harp to compile static files.
  // * concat to compile 1 file js file;

  grunt.loadNpmTasks('grunt-harp');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compressor');
  grunt.loadNpmTasks('grunt-contrib-concat');

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
        dest: 'tmp'
      },
    },

    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['public/**/*.ejs'],
        tasks: ['harp', 'compressor', 'concat']
      },
      css: {
        files: ['scss/*.scss'],
        tasks: ['sass:dev', 'harp']
      },
      js: {
        files: ['public/js/*.js'],
        tasks: ['harp', 'compressor', 'concat', 'clean:dev']
        }
    },

    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'public/css',
          ext: '.css',
          style: 'expanded'
        }]
      },
      deploy: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'public/css',
          ext: '.css',
          style: 'compressed'
        }]
      }
    },

    compressor: {
      html: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'tmp',
          src: ['**/*.html'],
          dest: 'build',
          ext: '.html'
        }]
      },
      js: {
        options: {
          mangle: true
        },
        files: [{
          expand: true,
          cwd: 'tmp',
          src: ['**/*.js'],
          dest: 'build',
          ext: '.js'
        }]
      }
    },

    concat: {
      options: {
        separator: ';\n',
      },
      base: {
        src: ['build/js/fastclick.js', 'build/js/base.js'],
        dest: 'build/js/base_compiled.js',
      },
      about: {
        src: ['build/js/fastclick.js', 'build/js/base.js', 'build/js/about_me.js'],
        dest: 'build/js/about_compiled.js',
      }
    },

    clean: {
      dev: ['build/js/*.js', '!build/js/*_compiled.js'],
      deploy: ['build/css', 'public/css', 'build/js']
    },

  });

   // Default task(s).
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('deploy', ['clean:deploy', 'sass:deploy', 'harp', 'compressor', 'concat', 'clean:dev']);
};