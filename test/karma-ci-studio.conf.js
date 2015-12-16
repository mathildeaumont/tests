/**
 * Karma configuration for executing tests with Jenkins
 */
'use strict';
module.exports = function (config) {
    config.set({
        /**
         * Base path that will be used to resolve all patterns (eg. files, exclude)
         */
        basePath: '../',

        /**
         * Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
         */
        frameworks: ['jasmine'],

        files: [
        /**
         * Additional libs
         */
            'app/shared/scripts/variables.js',
            'app/shared/scripts/support.js',
            'app/shared/scripts/objects.js',
            'app/shared/scripts/lib/pixi.js',

            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/modernizr/modernizr.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/jquery.scrollTo/jquery.scrollTo.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/ngDialog/js/ngDialog.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-touch/angular-touch.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/requirejs/require.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',

        /**
         * Shared files
         */
            // It is important to load init scripts first, otherwise tests will fails.
            // Moreover the files are only included once by Karma.
            'app/shared/scripts/*.js',
            'app/shared/scripts/**/*.js',

        /**
         * Kids files
         */
            'app/studio/scripts/**/*.js',

        /**
         * Tests files
         */
            'test/lib/*.js',
            'test/spec/studio/controllers/*.js'
        ],

        exclude: [
            'app/scripts/services/HttpService.js',
            // Because PhantomJS DO NOT SUPPORT Float64Array (PhantomJS 1.9.8)
            'app/shared/scripts/lib/libmp3lame.min.js'
        ],

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app',
            moduleName: 'directiveTemplate'
        },

        proxies: {
            '/views/': '/app/views/',
            '/configuration/': '/app/configuration/',
            '/filters/': '/app/filters/',
            '/i18n/': '/app/i18n/',
            '/scripts/': '/app/scripts/',
            '/images/': '/app/images/',
            '/styles/': '/app/styles/'
        },

        preprocessors: {
            'app/views/*.html': 'ng-html2js',
            'app/**/*.js': ['coverage']
        },

        /**
         * Available reporters: https://npmjs.org/browse/keyword/karma-reporter
         */
        reporters: ['progress', 'coverage', 'junit', 'tap'],

        junitReporter : {
            outputFile: 'coverage/test-results.xml'
        },

        tapReporter: {
            outputFile: 'coverage/unit.tap'
        },


        colors: false,

        port: 9876,

        /**
         * Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
         */
        logLevel: config.LOG_INFO,

        /**
         * Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
         * Since jenkins server is headless, it can't launch classical browsers such as Firefox or Chrome
         * PhantomJS is a headless browser thus it can execute all tests in this environment
         */
        browsers: ['PhantomJS'],

        /**
         * Continuous Integration mode
         * if true, Karma captures browsers, runs the tests and exits
         */
        singleRun: true
    });
};
