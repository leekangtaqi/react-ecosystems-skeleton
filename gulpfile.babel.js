"use strict";

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import nodemon from 'nodemon';
import gulpLoadPlugins from 'gulp-load-plugins';

var plugins = gulpLoadPlugins();
const entry = './client/**';
const clientPath = 'client';
const serverPath = 'server';

/**
 * Helper functions
 */
function onServerLog(log) {
    console.log(plugins.util.colors.white('[') +
        plugins.util.colors.yellow('nodemon') +
        plugins.util.colors.white('] ') +
        log.message);
}
function onProcessComplete(startTime){
    let endTime = (new Date()).getTime();
    console.log(plugins.util.colors.white('[') +
        plugins.util.colors.yellow('process') +
        plugins.util.colors.white('] ') +
        plugins.util.colors.yellow('Finished the process exec for ') +
        plugins.util.colors.green(parseFloat((endTime - startTime)/1000, 10).toFixed(2)) + ' s');
}

gulp.task("webpack:pro", () => {
    const config = require('./webpack.config');
    return gulp.src('client/main.js')
        .pipe(plugins.webpack(config))
        .pipe(plugins.uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
        .pipe(plugins.gzip())
        .pipe(gulp.dest('dist/client/assets/js'))
});

gulp.task('start:server', cb => {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    nodemon(`-w ${serverPath} ${serverPath}`)
        .on('log', log =>{ 
            onServerLog(log); 
        });
})

gulp.task('env:pro', () => {
    plugins.env({
        vars: {NODE_ENV: 'production'}
    });
})

gulp.task('env:dev', () => {
    plugins.env({
        vars: {NODE_ENV: 'development'}
    });
})

gulp.task('build', cb => {
    let startTime = (new Date()).getTime();
    runSequence(
        'env:pro',
        'webpack:pro',
        () => {
            cb();
            onProcessComplete(startTime);
        }
    )
})

gulp.task('dev', cb => {
    runSequence(
        'env:dev',
        ['start:server'],
        cb
    )
})