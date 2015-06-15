module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      default: {
        files: {
          'styles/css/styles.css': 'styles/less/theme/less/theme.less'
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
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', [
    'less',
    'autoprefixer',
    'cssmin',
    'watch'
  ]);
};
