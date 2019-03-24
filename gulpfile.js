const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.build.json');
const mjml = require('gulp-mjml');
const mjmlEngine = require('mjml');

gulp.task('build', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

gulp.task('unit', () => {
  gulp.src('src/**/*.spec.ts');
});

gulp.task('watch:mjml', () => {
  return gulp
    .src('./src/email/pages/reminder/reminder-partly-payment-1.mjml')
    .pipe(mjml())
    .pipe(gulp.dest('./src/email/pages/reminder/'));
});
