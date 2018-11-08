import gulp from 'gulp';
import plumber from 'gulp-plumber';

import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';

import preprocessor from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';

import config from '../config';
import { server } from './serve';

import handleErrors from '../utils/handleErrors';

const envDev = config.args.env === 'dev';

let processors = [
  autoprefixer({
    browsers: config.browsers
  })
];

function getStylesStream() {
  return gulp.src(`${config.src}/scss/main.scss`)
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(preprocessor());
}


export function processStyles() {
  return getStylesStream()
    // .pipe(plumber({
    //   errorHandler: function (err) {
    //     console.log(err);
    //     this.emit('end');
    //   }
    // }))
    .on('error', handleErrors)
    .pipe(postcss(processors))
    .pipe(envDev ? sourcemaps.write() : gutil.noop())
    .pipe(envDev ? gutil.noop() : header(config.banner))
    .pipe(envDev ? gutil.noop() : rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(`${config.dist}/styles`))
    .pipe(server.stream());
}
