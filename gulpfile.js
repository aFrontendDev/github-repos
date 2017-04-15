'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var gutil = require('gulp-util');
var environments = require('gulp-environments');
var wrench = require('wrench');
var shell = require('gulp-shell');

var config = require('./gulp/config');
var styles = require('./gulp/styles');

// build tasks
var build = function(callback) {
    runSequence(
        'styles',
        callback
    );
};

// build
gulp.task('build', function(callback) {
    build(callback);
});

// WATCH TASK
gulp.task('watch', ['build'], function() {
    gulp.watch(config.paths.styles.src + '**/*.scss', ['styles']);
});

gulp.task('commandline', shell.task([
	'npm start'
]));

gulp.task('react_watch', ['commandline', 'watch']);

gulp.task('default', ['react_watch']);
