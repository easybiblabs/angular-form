var browserify = require('browserify');
var source = require('vinyl-source-stream');
var collapse = require('bundle-collapser/plugin');

gulp.task('build', [], function() {
  var bro = browserify('./src/index.js', {
    standalone: 'angular-form',
    fullPaths: false
  });
  bro.plugin(collapse);
  bro.ignore('angular');
  return bro.bundle()
    .pipe(source('./index.js'))
    .pipe(gulp.dest('./dist'));
});
