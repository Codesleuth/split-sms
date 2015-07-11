var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    del = require('del'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

gulp.task('clean:dist', function (cb) {
  del(['dist/**'], cb);
});

gulp.task('jshint:tests', function () {
  return gulp.src(['test/**/*.js'])
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
    .pipe(mocha({reporter: 'dot'}));
});

gulp.task('build', function() {
  return browserify({
    entries: ['./lib/index.js'],
    standalone: 'splitter',
    builtins: false,
    insertGlobals: false
  })
  .bundle()
  .pipe(source('split-sms.js'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('test', ['jshint:tests', 'jshint:code', 'mochaTest']);
gulp.task('default', ['clean:dist', 'test', 'build']);
