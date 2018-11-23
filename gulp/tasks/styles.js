import gulp from 'gulp';
import plumber from 'gulp-plumber';

import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';

//import gutil from 'gulp-util';
import through2 from 'through2';

import preprocessor from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import header from 'gulp-header';
import rename from 'gulp-rename';

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
  return gulp.src(`${config.src}/styles/main.scss`)
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
    .pipe(envDev ? sourcemaps.write() : through2.obj())
    .pipe(envDev ? through2.obj() : header(config.banner))
    .pipe(envDev ? through2.obj() : rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(`${config.dist}/styles`))
    .pipe(server.stream());
}

function concatenateFonts() {
  return gulp.src(`${config.dist}/assets/fonts/*.css`)
    .pipe(concatCss("fonts.css"))
    .pipe(gulp.dest(`${config.dist}/assets/fonts`))
}

export function generateFonts(done) {
  const fontmin = new Fontmin()
    .src(`${config.src}/assets/fonts/*.{ttf,otf}`)
    .use(Fontmin.otf2ttf({
      clone: true
    }))
    .use(Fontmin.ttf2eot({
      clone: true
    }))
    .use(Fontmin.ttf2woff({
      clone: true
    }))
    .use(Fontmin.ttf2svg({
      clone: true
    }))
    .use(Fontmin.css({
      fontPath: './',
      //local: true  
    }))
    .dest(`${config.dist}/assets/fonts`)
    if(done) concatenateFonts()

  return fontmin.run((err) => {
    if (err) {
      console.log(err);
    }
    done();
  });
}
