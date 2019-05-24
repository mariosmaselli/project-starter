import gulp from 'gulp';
import Fontmin from 'fontmin';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import through2 from 'through2';
import preprocessor from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import header from 'gulp-header';
import rename from 'gulp-rename';
import concatCss from 'gulp-concat-css';
import cssnano from 'cssnano';
import newer from 'gulp-newer';
import config from '../config';
import { server } from './serve';
import handleErrors from '../utils/handleErrors';

const envDev = config.args.env === 'dev';

// Processors
if (envDev) {
  processors = [
    autoprefixer({
      browsers: config.browsers
    })
  ];
} else {
  processors = [
    autoprefixer({
      browsers: config.browsers
    }),
    cssnano()
  ];
}


function getStylesStream() {
  return gulp.src(`${config.src}/styles/main.scss`)
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(preprocessor());
}

export function processStyles() {
  return getStylesStream()
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
    //.pipe(newer(`${config.dist}/assets/fonts`))
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
