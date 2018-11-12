import gulp from 'gulp';
import tiny from 'gulp-tinypng';
import svgmin from 'gulp-svgmin';
import newer from 'gulp-newer';
import cache from 'gulp-cache';

import config from '../config';

import passwords from '../utils/passwords';

tiny.key = passwords ? passwords.tinypng : "YOUR_KEY";


export function optimizeImages() {

  return gulp.src([`${config.src}/images/**/*`, `!${config.src}/images/{sprite,sprite/**}`, `!${config.src}/images/{svg,svg/**}`])
    .pipe(newer(`${config.dist}/images`))
    .pipe(cache(tiny(tiny.key)))
    .pipe(gulp.dest(`${config.dist}/images`));
}


export function svgo() {
  return gulp.src([`${config.src}/images/svg/**/*`])
    .pipe(newer(`${config.dist}/images/svg`))
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
    .pipe(gulp.dest(`${config.dist}/images/svg`));

}
