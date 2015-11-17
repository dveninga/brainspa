module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: [
                    'assets/js/jquery-1.11.3.min.js',
                    'assets/js/bootstrap.min.js',
                    'assets/js/moment-with-langs.min.js',
                    'assets/js/jquery.validate.min.js',
                    'assets/js/jquery.sharrre.min.js',
                    'assets/js/messages_nl.js',
                    'assets/js/firebase.js',
                    'assets/js/agenda.js',
                    'assets/js/formulieren.js',
                    'assets/js/functions.js'
                ],
                dest: 'build/js/scripts.js',
            },
            css: {
                src: ['assets/css/style.min.css'],
                dest: 'build/css/style.min.css',
            },
        },
        uglify: {
            dist: {
                files: {
                    'build/js/scripts.min.js': ['build/js/scripts.js']
                },
            },
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: ['fonts/**'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'assets/',
                    src: ['css/style.css.map'],
                    dest: 'build/'
                }, ],
            },
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            }
        },
        sass: { // Task
            dist: { // Target
                files: { // Dictionary of files
                    'assets/css/style.css': 'assets/css/style.sass' // 'destination': 'source'
                }
            }
        },
        watch: {
            js: {
                files: ['assets/js/**/*.js'],
                tasks: ['concat', 'uglify'],
            },
            css: {
                files: ['assets/css/**/*.css'],
                tasks: ['cssmin', 'concat', 'copy'],
            },
            sass: {
                files: ['assets/css/**/*.sass'],
                tasks: ['sass'],
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['cssmin', 'concat', 'uglify', 'copy', 'watch']);
};