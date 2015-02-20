var gulp = require('gulp');
var watch = require('gulp-watch');
// var plumber = require('gulp-plumber');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return sass('app/scss/style.scss', {
      style: 'expanded',
      sourcemap: true
    })
    .pipe(sourcemaps.write('maps', {
        includeContent: false,
        sourceRoot: 'app/css/maps'
    }))
    .pipe(gulp.dest('app/css/'));
});

gulp.task('default', ['sass']);

var watcher = gulp.watch('app/scss/*.scss', ['sass']);

watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
