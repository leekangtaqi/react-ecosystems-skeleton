var gulp = require('gulp');
var path = require('path');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gzip = require('gulp-gzip');
var rename = require("gulp-rename");
var config = require('../webpack.config');
var fs = require('fs');

gulp.task("webpack", function() {
    gulp.src('web/test.js')
        .pipe(webpack(config))
        .pipe(uglify())
        .pipe(gzip())
        .pipe(gulp.dest('build/'))
});