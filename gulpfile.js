var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
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
  console.log('Base Directory: ' + __dirname);
  webpack({
    context: __dirname,
    entry: './src/app/index.js',
    output: {
      filename: 'index.js',
      path: path.join(__dirname, 'dist', 'app')
    },
    target: 'electron-main',
    module: {
      loaders: [{
    		test: /\.js$/,
    		exclude: /node_modules/,
    		loader: 'babel',
    		query: {
    		  presets: ['es2015']
    		}
  	 }]
   },
   node : {
     __dirname: true
   }
  }, function(err, stats) {
    if(err) console.log(err);
    gutil.log("[webpack]", stats.toString({}));
    done();
  });
});

gulp.task('default',['styles','html','jsx','electron',]);
