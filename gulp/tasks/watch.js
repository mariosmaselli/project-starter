import gulp from 'gulp';
import chalk from 'chalk';
import config from '../config';

import { processStyles } from './styles';
import { bundleVendor } from './scripts';

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

    // Watch styles files
    gulp.watch(
      `${config.src}/scss/**/*.scss`,
      processStyles
    ),
    
    // Watch package.json file
    gulp.watch('package.json', bundleVendor)

  ]
  
  watchers.map(watcher => addEventsHandlers(watcher));

  console.log(chalk.green('Watching changes...'));
  done();
}

watch.description = 'Watch all changes in source folder and launch task accordingly.';

