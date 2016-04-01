'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./frontend/styles/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./frontend/styles/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./frontend/styles/**/*.scss', ['sass']);
});