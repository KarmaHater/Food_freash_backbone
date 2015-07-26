module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-wiredep");
  grunt.loadNpmTasks("grunt-bower-concat");
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      my_target: {
        files: {
          'app/js/script.js' : ["app/components/js/*.js"]
        }//files
      }//my_target
    },//uglify
    wiredep: {
      task: {
        src: ['app/*html']
      }
    },
    bower_concat: {
      all: {
        dest: 'app/js/bower_components.js',
        css: 'app/css/bower_components.js'
      }
    },
    sass: {
      dev: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
        },// options
        files:  [{
          expand: true,
          cwd: 'app/components/sass',
          src: ['**/*.scss'],
          dest: 'app/css',
          ext: '.css'
        }]
      }
    },//sass
    watch: {
      options: { livereload: true },
      scripts: {
        files: ['app/components/js/*.js'],
        tasks: ['uglify']
      },//scripts
      compileSass: {
        files: ['app/components/sass/*.scss'],
        tasks: ['sass']
      },//sass
      html: {
        files: ['app/*.html']
      }//html
    }//watch
  })//initConfig
  grunt.registerTask('default', ['bower_concat', 'wiredep', 'watch'])
}//exports