var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');

gulp.task('test', function () {
  gulp.src(['test/**/*.js'])
    .pipe(plumber())  
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(mocha({
      reporter: 'Spec'
    }));
});

gulp.task('watch', function () {
  gulp.watch(['./*.js', 'test/*.js'], ['test']);
});

gulp.task('default', [
  'test',
  'watch'
]);