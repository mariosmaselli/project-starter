/**
 * Load tasks and export globals
 */

import gulp from 'gulp';
import config from '../config';

import { processStyles } from './styles';
import { bundleApp, bundleVendor } from './scripts';
import { optimizeImages, svgo, generateFavicons } from './images';
import { serve } from './serve';
import { watch } from './watch';

gulp.task(bundleVendor)

gulp.task(
  'scripts',
  gulp.parallel(bundleApp, bundleVendor)
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

gulp.task(
  'images',
  gulp.parallel(optimizeImages, svgo, generateFavicons)
);
const imagesTask = gulp.task('images');
imagesTask.description =
  'Optimize new images and cache them, create a spritesheet and generate favicons/metas.';

// Utils
gulp.task(serve);
gulp.task(watch);

gulp.task(
  'build',
  gulp.parallel('scripts', 'styles')
);
const buildTask = gulp.task('build');
buildTask.description = 'Build scripts and styles with minification tasks.';

gulp.task(
  'default',
  gulp.series(
    gulp.parallel('styles', 'scripts', 'images'),
    gulp.parallel(serve, watch)
  )
);

const defaultTask = gulp.task('default');
defaultTask.description = 'Launch dev or prod default task.';