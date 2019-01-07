import del from 'del';

import cache from 'gulp-cache';

import config from '../config';

export function cleanDeleteFiles(done) {
  return del([
    `!${config.dist}/**.html`,
    `!${config.dist}/scripts/**`,
    `!${config.dist}/styles/**`,
    `!${config.dist}/templates/**`,
    `!${config.dist}/assets/**`,
    '.sass-cache'
  ], done);
}

export function cleanClearCache(done) {
  return cache.clearAll(done);
}
