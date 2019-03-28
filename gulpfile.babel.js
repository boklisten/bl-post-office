//const gulp = require('gulp');
import gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as tsProject from './tsconfig.build.json';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
import mjml2html from 'mjml';
import * as gutil from 'gulp-util';
import * as fs from 'fs';
import path from 'path';
import * as mjml from 'gulp-mjml';
import {registerComponent} from 'mjml-core';
import log from 'fancy-log';
import * as browserSync from 'browser-sync';
const extReplace = require('gulp-ext-replace');
const tap = require('gulp-tap');
var mustache = require('gulp-mustache');
const es = require('event-stream');
const through = require('through2');
const del = require('del');
import copy from 'gulp-copy';

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

const watchedComponents = walkSync('./src/email/components');

function read(path) {
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    return data;
  });
}

function compileMustache() {
  return through.obj((file, encoding, cb) => {
    let jsonFilePath = file.path.replace(/html/g, 'json');
    jsonFilePath = jsonFilePath.replace('mustache', 'json');
    jsonFilePath = jsonFilePath.replace('tmp', 'src');
    const jsonFile = require(jsonFilePath);
    const destPath = file.path.replace('mustache', 'pages');
    log(destPath);
    gulp
      .src(file.path)
      .pipe(mustache(jsonFile))
      .pipe(gulp.dest('server/email/pages/'));
    cb();
  });
}

function cleanTmp() {
  return del(['tmp']);
}

function compileMjmlMustachePagesToHtml() {
  return gulp
    .src('./tmp/email/mustache/**/*.html')
    .pipe(compileMustache())
    .pipe(gulp.dest('./tmp/email/html/'));
}

function linkMjmlComponents() {
  return gulp
    .src(path.normalize('./src/email/components/**/*.js'))
    .pipe(babel())
    .on('error', log)
    .pipe(gulp.dest('./tmp/email/lib/'))
    .on('end', () => {
      watchedComponents.forEach(compPath => {
        let p = compPath.replace('components', 'lib');
        p = p.replace('src', 'tmp');
        const fullPath = path.join(process.cwd(), p);
        delete require.cache[fullPath];
        registerComponent(require(fullPath).default);
      });
    });
}

function compileMjmlPages() {
  return gulp
    .src('./src/email/pages/**/*.mjml')
    .pipe(
      tap((file, t) => {
        const mjmlFile = mjml2html(file.contents.toString('utf8'));
        file.contents = new Buffer(mjmlFile.html);
      }),
    )
    .pipe(extReplace('.html'))
    .pipe(gulp.dest('./tmp/email/mustache/'));
}

function buildMjml(done) {
  return gulp.series(
    copyConfig,
    linkMjmlComponents,
    compileMjmlPages,
    cleanTmp,
  )(done);
}

function buildMjmlTest(done) {
  return gulp.series(buildMjml, compileMjmlMustachePagesToHtml, cleanTmp)(done);
}

function copyConfig() {
  return gulp.src('src/email/config/**/*').pipe(gulp.dest('tmp/email/config/'));
}

gulp.task('build', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

gulp.task('unit', () => {
  gulp.src('src/**/*.spec.ts');
});

gulp.task('email:build', done => {
  return buildMjml(done);
});

gulp.task('email:build:test', done => {
  return buildMjmlTest(done);
});

gulp.task('email:serve', () => {
  browserSync.init({
    server: './server/email/pages',
  });
  gulp.series(buildMjmlTest);
  gulp.watch(['./src/**/*']).on(
    'change',
    gulp.series(buildMjmlTest, cleanTmp, () => {
      browserSync.reload();
    }),
  );
});
