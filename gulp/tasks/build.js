var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', [], function() {
  var bro = browserify('./src/index.js', {
    standalone: 'angular-form'
  });
  bro.ignore('angular');
  return bro.bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist'));
});
 
