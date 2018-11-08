import gulp from 'gulp';
import config from '../config';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify'

import gutil from 'gulp-util';
import uglify from 'gulp-uglify';

import handleErrors from '../utils/handleErrors';
import bundleLogger from '../utils/bundleLogger';
import { reload } from './serve';

const envDev = config.args.env === 'dev';

const b = browserify({
  entries: [`${config.src}/js/main.js`],
  extensions: [config.extensions.scripts],
  debug: envDev,
  cache: {},
  packageCache: {},
  fullPaths: envDev
});


const bundler = envDev ? watchify(b) : b;

const bundle = (done) => {
  bundleLogger.start();

  return bundler
    .bundle()
    .on('error', handleErrors)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(envDev ? gutil.noop() : uglify())
    .on('error', handleErrors)
    .pipe(envDev ? gutil.noop() : header(config.banner))
    .pipe(envDev ? gutil.noop() : rename({
      suffix: '.min'
    }))
    .on('end', () => {
      if (envDev) {
        reload(() => {});
      } else {
        done();
      }
      bundleLogger.end();
    })
    .pipe(gulp.dest(`${config.dist}/scripts`));
};


if (envDev) {
  bundler.on('update', bundle);
}

export function bundleApp(done) {
  if (envDev) {
    bundle();
    done();
  } else {
    bundle(done);
  }
}