var eslint = require('gulp-eslint'),
  jscs = require('gulp-jscs');

function ignore(path) {
  return '!' + path;
}

gulp.task('lint', ['eslint', 'jscs']);

// rules set in frontend/.eslintrc
gulp.task('eslint', function() {
  return gulp
    .src([
      paths.src + 'modules/**/*.js',
      paths.src + 'utility/**/*.js',
      ignore(paths.src + 'modules/decorators/form-decorators-cache.js')
    ])
    .pipe(eslint())
    .pipe(eslint.formatEach('compact', process.stderr))
    .pipe(eslint.failOnError());
});

gulp.task('jscs', function() {
  return gulp
    .src([
      paths.src + 'modules/**/*.js',
      paths.src + 'utility/**/*.js',
      ignore(paths.src + 'modules/decorators/form-decorators-cache.js')
    ])
    .pipe(jscs('./jscs.json'));
});
