/**
 * Load tasks and export globals
 */

import gulp from 'gulp';
import config from '../config';

import { processStyles } from './styles';
import { serve } from './serve';
import { watch } from './watch';


gulp.task(
  'styles',
  gulp.parallel(processStyles)
);

const stylesTask = gulp.task('styles');
stylesTask.description =
  'Compile sass/less/stylus files with sourcemaps + autoprefixer and convert fonts.';

gulp.task(
  'default',
  gulp.series(
    gulp.parallel('styles'),
    gulp.parallel(serve, watch)
  )
);

const defaultTask = gulp.task('default');
defaultTask.description = 'Launch dev or prod default task.';