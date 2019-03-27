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
//import * as mustache from 'gulp-mustache';
var mustache = require('gulp-mustache');

gulp.task('default', () => {
  return '';
});

//registerComponent(BlFooter);

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

const watchedComponents = walkSync('./src/email/components');

const compileMjml = () => {
  return gulp
    .src(path.normalize('./src/email/components/**/*.js'))
    .pipe(babel())
    .on('error', log)
    .pipe(gulp.dest('./src/email/lib/'))
    .on('end', () => {
      watchedComponents.forEach(compPath => {
        const fullPath = path.join(
          process.cwd(),
          compPath.replace('components', 'lib'),
        );
        delete require.cache[fullPath];
        log(require(fullPath).default);
        registerComponent(require(fullPath).default);
      });

      fs.readFile(
        path.normalize(
          './src/email/pages/reminder/reminder-partly-payment-1.mjml',
        ),
        'utf8',
        (err, data) => {
          if (err) throw err;
          const result = mjml2html(data);
          fs.writeFileSync(
            path.normalize(
              './src/email/lib/pages/reminder/reminder-partly-payment-1.html',
            ),
            result.html,
          );
          compileMustache();
          browserSync.reload();
        },
      );
    });
};

const compileMustache = () => {
  gulp
    .src('./src/email/lib/pages/reminder/reminder-partly-payment-1.html')
    .pipe(
      mustache(
        {
          hello: 'HEllo from GULP',
          itemList: {
            summary: {total: '2710 kr', totalTax: '0 kr', taxPercentage: '20'},
            items: [
              {
                id: '12838199',
                title: 'Book of JOB',
                deadline: '01.07.2019',
                leftToPay: '2050 kr',
              },
              {
                id: '12882139',
                title: 'The HOLY bible',
                deadline: '01.07.2019',
                leftToPay: '110 kr',
              },
              {
                id: '12830001',
                title: 'Upside down, inside out',
                deadline: '01.07.2019',
                leftToPay: '550 kr',
              },
            ],
          },
        },
        {},
        {},
      ),
    )
    .pipe(gulp.dest('./tmp/email/pages/reminder/'));
};

gulp.task('build', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

gulp.task('unit', () => {
  gulp.src('src/**/*.spec.ts');
});

gulp.task('mjml:build', () => {
  return compileMjml();
});

gulp.task('mjml:watch', () => {
  compileMjml();

  return watch(
    [
      path.normalize('./src/email/components/**/*.js'),
      path.normalize('./src/email/pages/**/*.mjml'),
    ],
    compileMjml,
  );
});

gulp.task('mjml:serve', () => {
  browserSync.init({
    server: './tmp/email/pages',
  });

  compileMjml();
  gulp.watch('./src/email/components/**/*.js').on('change', compileMjml);
  gulp.watch('./src/email/pages/**/*.mjml').on('change', compileMjml);
});
