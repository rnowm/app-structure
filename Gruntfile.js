module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      default: {
        files: {
          'styles/css/styles.css': 'styles/less/theme.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 5 versions']
      },
      dist: {
        src: 'styles/css/styles.css'
      },
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'styles/css/styles.min.css': 'styles/css/styles.css',
        }
      }
    },

    watch: {
      styles: {
        files: ['../**/*.less'],
        tasks: ['less','autoprefixer','cssmin'],
        options: {
          nospawn: true,
          // livereload: true
        }
      }
    },

    // Creates embedded icon font
    webfont: {
      embedded: {
        src: 'styles/less/icons/source/*.svg',
        dest: 'styles/less/icons/fonts/',
        options: {
          stylesheet: 'less',
          font: 'icons',
          //embed: 'woff,ttf,eot',
          embed: 'woff,ttf',
          engine: 'node',
          template: 'styles/less/icons/templates/style.css',
          htmlDemoTemplate: 'styles/less/icons/templates/index.html',
          templateOptions: {
            baseClass: '',
            classPrefix: '',
            mixinPrefix: ""
          }
        }
      }
    }
  });

  grunt.registerTask('default', [
    'webfont',
    'less',
    'autoprefixer',
    'cssmin',
    'watch'
  ]);
};
