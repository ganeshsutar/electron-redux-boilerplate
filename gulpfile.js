var gulp = require('gulp'),
    childProcess = require('child_process'),
    electron = require('electron-prebuilt'),
    sass = require('gulp-sass'),
    debug = require('gulp-debug'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    gutil = require('gulp-util'),
    jetpack = require('fs-jetpack');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');


gulp.task('run', function(){
    childProcess.spawn(electron, ['./app'], {stdio: 'inherit'});
});

gulp.task('styles', function(){
    return gulp.src('./app/scss/**/*.scss')
        .pipe(debug())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('jsx', function(done){
    webpack(webpackConfig, function(err, stats) {
        if(err) console.log(err);
        gutil.log("[webpack]", stats.toString({}));
        done();
    });
});

gulp.task('clean', function(callback){
    return destDir.dirAsync('.', {empty: true});
});

gulp.task('build', ['styles','jsx'], function(callback){
    gutil.log('Building the application');
    return projectDir.copyAsync('app', destDir.path(), {
        overwrite: true,
        matching: [
            './node_modules/**/*',
            './assets/**',
            'main.js',
            'index.html',
            'package.json'
        ]
    });
});

gulp.task('build-electron', ['build'], function(){
    var release_window = require('./resources/build.windows.js');
    var os = require('os');
    return release_window.build();
});

gulp.task('default', ['styles']);
