'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', ['sass', 'lint', 'js'], function() {
	
	// browserSync({
	// 	notify: false,
	// 	server: {
	// 		baseDir: './',
	// 		middleware: [ history() ]
	// 	}
	// });
	

	gulp.watch('assets/sass/**/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.js', ['js', 'lint']);

	 //gulp.watch(['*.html', 'build/*.css', 'build/*.js'], {cwd: ''}, reload);
	
});