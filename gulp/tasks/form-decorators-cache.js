var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');

gulp.task('form-decorators-cache', function() {
  return gulp.src(paths.src + 'modules/decorators/*.html')
      .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(templateCache({
        moduleSystem: 'browserify',
        module: 'form-decorators',
        root: './src/form/decorators/'
      }))
    .pipe(concat('form-decorators-cache.js'))
    .pipe(gulp.dest(paths.src + 'modules/decorators/'));
});
