'use strict';

var gulp = require('gulp');
var history = require('connect-history-api-fallback');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//Add 'ejs', if needed

gulp.task('serve', ['sass', 'lint', 'js'], function() {
	
	// browserSync({
	// 	notify: false,
	// 	server: {
	// 		baseDir: './',
	// 		middleware: [ history() ]
	// 	}
	// });

	//If you are using EJS uncomment this section not the avobe
	// browserSync({
	// 	notify: false,
	// 	server: {
	// 		baseDir: './build',
	// 		middleware: [ history() ]
	// 	}
	// });
	

	gulp.watch('assets/sass/**/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.js', ['js', 'lint']);
	//gulp.watch('templates/*.ejs', ['ejs']);

	 //gulp.watch(['*.html', 'build/*.css', 'build/*.js'], {cwd: ''}, reload);
	
});