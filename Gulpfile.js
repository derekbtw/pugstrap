var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var gulp_watch_pug = require('gulp-watch-pug');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.task('views', function buildHTML() {
    gulp.src('pug/**/*.pug')
        .pipe(watch('pug/**/*.pug'))
        .pipe(gulp_watch_pug('pug/**/*.pug', { delay: 100 }))
        .pipe(pug())
        .pipe(gulp.dest('./'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('pug/*.pug',['views']);
});
