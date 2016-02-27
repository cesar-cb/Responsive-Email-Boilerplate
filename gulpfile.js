'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;




var concat = require('gulp-concat');

var inlineCss = require('gulp-inline-css');
var inlineSource = require('gulp-inline-source');

var rename = require('gulp-rename');


gulp.task('styles', function() {
  return gulp.src('app/styles/css/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream: true}));
}); 


gulp.task('inline', ['styles'], function() {
  return gulp.src('app/*.html')
    .pipe(inlineSource({
      rootpath: 'app'
    }))
    .pipe(inlineCss({
      preserveMediaQueries: true
    }))
    .pipe(gulp.dest('dist/'));
});



gulp.task('clean', require('del').bind(null, 'dist'));

gulp.task('build', ['clean','inline']);

gulp.task('serve', ['styles'], function() {
  browserSync({
    server: './app',
    notify: false,
    debugInfo: false,
    host: 'localhost'
  });

  gulp.watch('app/styles/css/*.css', ['styles']);
  gulp.watch('app/*.html').on('change', reload);
  
});

gulp.task('serve:dist', ['inline'], function() {
  browserSync({
    server: './dist',
    notify: false,
    debugInfo: false,
    host: 'localhost'
  });
});
