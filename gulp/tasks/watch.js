import gulp from 'gulp';
import chalk from 'chalk';
import config from '../config';

import { reload } from './serve';

import { markup } from './markup';
import { processStyles } from './styles';
import { bundleVendor } from './scripts';
import { optimizeImages } from './images';


function onWatchChange(filePath) {
  console.log(`Updating File ${chalk.hex('#fff116').underline(filePath)}`);
}


function addEventsHandlers(watcher) {
  return watcher
    //.on('add', onWatchAdd)
    .on('change', onWatchChange)
    //.on('unlink', onWatchRemove)
    //.on('error', onWatchError);
}

export function watch(done) {

  const watchers = [

    // Watch html files
    gulp.watch([`${config.src}/*.ejs`, `${config.src}/templates/*.ejs`],  gulp.series(markup, reload)),

    // Watch styles files
    gulp.watch(
      `${config.src}/styles/**/*.scss`,
      processStyles
    ),
    
    // Watch package.json file
    gulp.watch('package.json', bundleVendor),

    // Watch images files
    gulp.watch([`${config.src}/assets/images/**/*`], optimizeImages)

  ]
  
  watchers.map(watcher => addEventsHandlers(watcher));

  console.log(chalk.green('Watching changes...'));
  done();
}

watch.description = 'Watch all changes in source folder and launch task accordingly.';

