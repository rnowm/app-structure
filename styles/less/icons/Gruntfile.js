module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    // Creates embedded icon font
    webfont: {
      embedded: {
        src: 'source/*.svg',
        dest: 'fonts/',
        options: {
          font: 'icons',
          embed: 'woff,ttf,eot',
          engine: 'node',
          template: 'templates/style.css',
          htmlDemoTemplate: 'templates/index.html',
          templateOptions: {
            baseClass: '',
            classPrefix: '',
            mixinPrefix: ""
          }
        }
      }
    },

    rename: {
      css: {
        src: 'fonts/icons.css',
        dest: 'icons.css',
      },
      html: {
        src: 'fonts/icons.html',
        dest: 'index.html',
      }
    },

    bump: {
      options : {
        files: ['bower.json'],
        commitFiles: ["-a"],
        pushTo: 'origin'
      }
    },

    exec: {
      // add new files before commiting
      add: {
        command: 'git add -A'
      },

      // push to gh-pages branch
      pages: {
        command: [
          'git checkout gh-pages',
          'git pull origin master',
          'git push origin gh-pages',
          'git checkout master'
        ].join('&&')
      },

      // adds prompted commit message
      message: {
        command: function() {
          var message = grunt.config('gitmessage');
          return "git commit -am '" + message + "'";
        }
      }
    },

    prompt: {
      commit: {
        options: {
          questions: [
            {
              config: 'gitmessage',
              type: 'input',
              message: 'Commit Message'
            }
          ]
        }
      }
    }
  });

  grunt.registerTask('default', [
    'webfont:embedded',
  ]);

  grunt.registerTask('release', [
    'webfont:embedded',
    'exec:add',
    'prompt',
    'exec:message',
    'bump',
    'exec:pages'
  ]);
};
