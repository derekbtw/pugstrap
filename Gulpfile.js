var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var gulp_watch_pug = require('gulp-watch-pug');
var connect = require('gulp-connect');

var config = {
    bootStrapDir: './bower_components/bootstrap',
    publicDir: './public'
}

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

//keeps gulp from crashing for scss errors & gives sass access to bootstrap
gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass({ 
            errLogToConsole: true,
            includePaths: [config.bootStrapDir + '/assets/stylesheets']
        }))
        .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('views', function buildHTML() {
    gulp.src('pug/*.pug')
        .pipe(watch('pug/*.pug'))
        .pipe(gulp_watch_pug('pug/*.pug', { delay: 100 }))
        .pipe(pug())
        .pipe(gulp.dest('./public'));
});

gulp.task('livereload', function() {
    gulp.src('./public/**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./pug/**/*.pug', ['views']);
    gulp.watch(config.publicDir + '/**/*', ['livereload']);
});

gulp.task('default', ['connect', 'watch', 'sass']);
