import gulp from 'gulp';

import ejs from 'gulp-ejs';
import htmlmin from 'gulp-htmlmin';
import handleErrors from '../utils/handleErrors';
import del from 'del';

import config from '../config';

function deleteHtml(done) {
  return del([
    `${config.src}/*.html`,
  ], done);
}

function minifyhtml() {
  return gulp.src(`${config.src}/*.html`)
  .pipe(htmlmin({ collapseWhitespace: true }))
  .on('error', handleErrors)
  .pipe(gulp.dest(config.dist))
  .on('end', deleteHtml);
}

export function markup() {
  return gulp.src(`${config.src}/*.ejs`, {
    base: config.src
  })
  .pipe(ejs({
    context: {
      ENV: config.args.env,
      data: {
        title: config.title,
        description: config.description,
        url: config.prodURL,
        image: config.shareImageURL,
        twitterHandle: config.twitterHandle,
        twitterImage: config.twitterImage,
        themeColor: config.themeColor
      },
      UA: config.analyticsUA
    },

  }, {}, { ext: '.html' }))
  .on('error', handleErrors)
  .pipe(gulp.dest(config.src))
  .on('end', minifyhtml);
}

markup.description = 'Process html files with environment configuration.';

