'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint({'esversion': 6 }))
        .pipe(jshint.reporter('default'));
});