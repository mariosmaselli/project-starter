import fs from 'fs';
import gulp from 'gulp';
import tinypng from 'gulp-tinypng';
import svgmin from 'gulp-svgmin';
import newer from 'gulp-newer';
import cache from 'gulp-cache';
import favicons from 'favicons';
import mkdirp from 'mkdirp';
import config from '../config';
//import passwords from '../utils/passwords';

//Add your own API KEY https://tinypng.com/developers
const TINYPNG_API =  "8FiQFj9oWwEyTBHMMwxjvuYNx05Fphk2"; 

export function optimizeImages() {

  if(TINYPNG_API === "8FiQFj9oWwEyTBHMMwxjvuYNx05Fphk2") {
    console.log(chalk.red('Please update TinyPng Key API'));
  }

  return gulp.src([`${config.src}/assets/images/**/*`, `!${config.src}/assets/{sprite,sprite/**}`, `!${config.src}/assets/{svgs,svgs/**}`])
    .pipe(newer(`${config.dist}/assets/images`))
    .pipe(tinypng({
      apiKey: TINYPNG_API,
      cached: true
    }))
    .pipe(gulp.dest(`${config.dist}/assets/images`));
}


export function svgo() {
  return gulp.src([`${config.src}/assets/svgs/**/*`])
    .pipe(newer(`${config.dist}/assets/svgs`))
    .pipe(cache(svgmin({
      plugins: [
        {removeDoctype: true},
        {removeXMLProcInst: true},
        {removeComments: true},
        {removeMetadata: true},
        {removeTitle: true},
        {removeDesc: true},
        {removeUselessDefs: true},
        {removeEditorsNSData: true},
        {cleanupEnableBackground: true},
        {removeEmptyAttrs: true},
        {removeHiddenElems: true},
        {removeEmptyText: true},
        {removeEmptyContainers: true},
        {minifyStyles: true},
        {convertStyleToAttrs: true},
        {convertColors: true},
        {convertTransform: true},
        {removeUnknownsAndDefaults: true},
        {removeNonInheritableGroupAttrs	: true},
        {removeUnusedNS: true},
        {cleanupIDs: true},
        {removeRasterImages: true},
        {mergePaths: true},
        {convertShapeToPath: true}
      ]
    })))
    .pipe(gulp.dest(`${config.dist}/assets/svgs`));

}

export function generateFavicons(done) {
  return favicons(`${config.src}/assets/favicon/favicon.png`, {
    appName: config.title,
    appDescription: config.description,
    developerName: config.author,
    developerURL: config.developerURL,
    background: '#fff',
    path: 'assets/favicon/',
    url: 'images/share.jpg',
    display: 'standalone',
    orientation: 'portrait',
    version: config.version,
    logging: config.verbose,
    online: false,
    icons: {
      android: true,
      appleIcon: false,
      appleStartup: false,
      coast: true,
      favicons: true,
      firefox: true,
      opengraph: false,
      twitter: false,
      windows: true,
      yandex: true
    }
  }, (error, response) => {
    if (error) {
      console.log(error.status);
      console.log(error.name);
      console.log(error.message);
    }

    const faviconFolder = `${config.dist}/assets/favicon/`;

    if (response.images) {
      mkdirp.sync(faviconFolder);
      response.images.forEach((image) =>
        fs.writeFileSync(`${faviconFolder}${image.name}`, image.contents)
      );
    }

    if (response.files) {
      mkdirp.sync(faviconFolder);
      response.files.forEach((file) =>
        fs.writeFileSync(`${faviconFolder}${file.name}`, file.contents)
      );
    }

    if (response.html) {
      fs.writeFileSync(`${config.src}/views/header/favicons.ejs`, response.html.join('\n'));
    }

    done();
  });
}