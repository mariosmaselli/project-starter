'use strict';


var gulp            = require('gulp');
var ejs             = require("gulp-ejs");


gulp.task('ejs', function() {

    gulp.src("./templates/*.ejs")
    .pipe(ejs({ msg: ''}, {}, { ext: '.html' }))
    .pipe(gulp.dest("./build"))

});
