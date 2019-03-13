'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var rename = require("gulp-rename");
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

gulp.task('watch', function() {
  gulp.watch('./app/sass/main.scss', ['minify-css']);
});

gulp.task('sass', function () {
  return gulp.src('./app/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(rename("style.css"))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./app/css/dev/source'));
});

gulp.task('concat', ['sass'], function() {
  return gulp.src('./app/css/dev/source/*.css')
    .pipe(concat('style.concat.css'))
    .pipe(gulp.dest('./app/css/dev'));
});

gulp.task('minify-css', ['concat'], () => {
  return gulp.src('./app/css/dev/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('./app/css'));
});
