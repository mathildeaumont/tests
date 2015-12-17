'use strict';

/**
 * Gulp dependencies
 */
var gulp = require('gulp'),
// Test
    karma = require('karma').server,
    protractor = require('gulp-protractor').protractor,

// Linting
    jshint = require('gulp-jshint'),
    jshintXMLReporter = require('gulp-jshint-xml-file-reporter'),

/**
 * Paths
 */
    baseDir = 'app/';

/**
 * Tests tasks
 */
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/../test/karma.conf.js'
    }, done);
});

gulp.task('test-midway', function (done) {
    karma.start({
        configFile: __dirname + '/test/karma-midway.conf.js'
    }, done);
});

gulp.task('test-e2e', function () {
    gulp.src(['test/e2e/*.js'])
        .pipe(protractor({
            configFile: 'test/protractor-kids.conf.js'
        }))
        .on('error', function (e) {
            throw e;
        });
});

/**
 * Jshint tasks
 */
gulp.task('verify', function () {
    return gulp.src(baseDir + 'app/studio/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintXMLReporter))
        .pipe(jshint.reporter('cool-reporter'))
        .on('end', jshintXMLReporter.writeFile({
            format: 'checkstyle',
            filePath: './jshint.xml'
        }));
});

gulp.task('verify-ci', function () {
    return gulp.src(baseDir + '**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintXMLReporter))
        .on('end', jshintXMLReporter.writeFile({
            format: 'checkstyle',
            filePath: './jshint.xml'
        }));
});