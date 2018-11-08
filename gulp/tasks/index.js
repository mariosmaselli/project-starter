/**
 * Load tasks and export globals
 */

import gulp from 'gulp';
import config from '../config';

import { processStyles } from './styles';
import { bundleApp } from './scripts';
import { serve } from './serve';
import { watch } from './watch';


gulp.task(
  'scripts',
  gulp.parallel(bundleApp)
);
const scriptTask = gulp.task('scripts');
scriptTask.description = 'Bundle app scripts with browserify (watchify)';

gulp.task(
  'styles',
  gulp.parallel(processStyles)
);

const stylesTask = gulp.task('styles');
stylesTask.description =
  'Compile sass/less/stylus files with sourcemaps + autoprefixer and convert fonts.';


// Utils
gulp.task(serve);
gulp.task(watch);


gulp.task(
  'default',
  gulp.series(
    gulp.parallel('styles', 'scripts'),
    gulp.parallel(serve, watch)
  )
);

const defaultTask = gulp.task('default');
defaultTask.description = 'Launch dev or prod default task.';