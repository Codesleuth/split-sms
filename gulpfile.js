var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    browserify = require('gulp-browserify');

gulp.task('jshint:tests', function () {
  return gulp.src(['test/**/*.test.js'])
    .pipe(jshint('./test/.jshintrc'))
    .pipe(jshint.reporter('default'));
});
 
gulp.task('jshint:code', function () {
  return gulp.src(['gulpfile.js', './lib/**/*.js'])
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('mochaTest', ['jshint:tests', 'jshint:code'], function () {
  return gulp.src('test/**/*.test.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('browserify', function() {
  return gulp.src('script/split-sms.js')
  .pipe(browserify({
    insertGlobals: false
  }))
  .pipe(gulp.dest('./build/js'));
});

gulp.task('default', ['jshint:tests', 'jshint:code', 'mochaTest']);