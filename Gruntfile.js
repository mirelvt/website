module.exports = function(grunt) {

  // Load the npm tasks configured for this project:
  // * sass

  grunt.loadNpmTasks('grunt-harp');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compressor');
  grunt.loadNpmTasks('grunt-contrib-copy');


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
        tasks: ['harp', 'compressor']
      },
      css: {
        files: ['scss/*.scss'],
        tasks: ['compass:dev', 'harp']
      },
      js: {
        files: ['public/js/*.js'],
        tasks: ['harp', 'compressor']
        }
    },

    compass: {
      dev: {
        options: {
          sassDir: ['scss'],
          cssDir: ['public/css'],
          imagesDir: ['build/img'],
          fontsDir: ['/../fonts'],
          outputStyle: 'expanded',
          // debugInfo: true, // is needed if you use fire-sass for firebug
          raw: "sass_options = {:sourcemap => true}" // Used for firefox developer tools sass debug
        }
      },
      deploy: {
        options: {
          sassDir: ['scss'],
          cssDir: ['public/css'],
          imagesDir: ['build/img'],
          fontsDir: ['../fonts'],
          outputStyle: 'compressed'
        }
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

    copy: {
      main: {
        src: ['public/rss.xml'],
        dest: 'build/rss.xml',
      },
    },

    clean: ['build/css', 'public/css', 'build/minified', 'build/js']
  });

   // Default task(s).
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('deploy', ['clean', 'compass:deploy', 'harp', 'copy', 'compressor']);
};