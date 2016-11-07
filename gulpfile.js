var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var webpackConfig = require('./webpack.config.js');
var webpack = require('webpack');
var path = require('path');

gulp.task('styles', function(){
  return gulp.src('src/public/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/public/css'));
});

gulp.task('html', function(){
  return gulp.src('src/public/**/*.html')
    .pipe(gulp.dest('dist/public/'));
});

gulp.task('jsx', function(done){
  webpack(webpackConfig, function(err, stats) {
    if(err) console.log(err);
    gutil.log("[webpack]", stats.toString({}));
    done();
  });
});

// Server WEBPACK
gulp.task('electron', function(done){
  return gulp.src('./src/app/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/app'));
});

gulp.task('default',['styles','html','jsx','electron',]);
