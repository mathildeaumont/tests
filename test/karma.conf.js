'use strict';

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine',
            'jasmine-matchers'
        ],

        // list of files / patterns to load in the browser
        files: [
            'app/params/externalParams.js',

            /* ***
             * LIBS
             */
            'lib/webui-popover/jquery.webui-popover.min.js',
            'lib/spectrum/spectrum.js',
            'lib/studioKernel/konami.js',
            
            /* ***
             * BOWER_COMPONENTS
             */
            // JQuery
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jquery-ui/jquery-ui.js',
            
            // angular-*
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-validation-match/dist/angular-validation-match.js',
            'bower_components/angular-recursion/angular-recursion.js',

            // textAngular
            'lib/textAngular/*.js',
            'bower_components/textAngular/dist/textAngular-sanitize.js',
            'bower_components/textAngular/dist/textAngular-rangy.js',
            'bower_components/textAngular/dist/textAngular-sanitize.js',
            
            // Other stuff
            'bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.js',
            'bower_components/ngstorage/ngStorage.js',
            'bower_components/angularLocalStorage/dist/angularLocalStorage.min.js',
            'bower_components/modernizr/modernizr.js',
            'bower_components/ngDialog/js/ngDialog.js',
            'bower_components/rangy/rangy-core.js',
            'bower_components/rangy/rangy-selectionsaverestore.js',
            'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
            'bower_components/jsbn-angular/jsbn.js',
            'bower_components/jsbn-angular/jsbn2.js',

            'bower_components/quick-ngrepeat/quick-ng-repeat.js',
            'bower_components/pdfjs-dist/build/pdf.js',
            'bower_components/audio5js/audio5.js',

            'bower_components/ng-simplePagination/simplePagination.js',
            'bower_components/angular-contenteditable/angular-contenteditable.js',


            // concatenated flow.js + ng-flow libraries
            'bower_components/ng-flow/dist/ng-flow-standalone.js',
            'bower_components/moment/moment.js',
            'bower_components/moment/locale/fr.js',

            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',


            // MathJax
            'bower_components/MathJax/MathJax.js',
            'bower_components/MathJax/config/MML_HTMLorMML.js',

            'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
            'bower_components/ng-scrollbars/dist/scrollbars.min.js',

                /* ***
             * APP SCRIPTS
             */
            // Environment configuration
            'app/studio/studio-config.js',

//            // Global configuration
//            'app/shared/scripts/shared.js',
//            'app/shared/scripts/variables.js',
//            'app/shared/scripts/support.js',
//            'app/shared/scripts/objects.js',
//            'app/shared/scripts/init.js',

            // Bootstrapping
            'app/studio/app.module.js',
            'app/studio/app.run.js',
            'app/studio/app.constant.js',
            'app/studio/app.config.js',
            
            // modules
            'app/studio/common/**/*.module.js',
            'app/studio/**/*.module.js',
            
            // controllers
            'app/studio/common/**/*.controller.js',
            'app/studio/**/*.controller.js',
            
            // factories
            'app/studio/common/**/*.factory.js',
            'app/studio/**/*.factory.js',

            // directives
            'app/studio/common/**/*.directive.js',
            'app/studio/**/*.directive.js',
            
            
            // others
            'app/studio/common/**/*.js',
            'app/studio/**/*.js',

            // include tests files
            'test/unit/loadConf.js',
            'test/unit/**/*.js',


            {
                pattern: 'app/shared/res/conf.json',
                watched: true,
                served: true,
                included: false
            }
        ],


        // list of files to exclude
        exclude: [],

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: 'app'
        },

        proxies: {
            '/shared/res/conf.json': '/shared/res/conf.json',
            '/studio': 'app/studio/**'
        },

        preprocessors: {
            'app/**/*.html': 'ng-html2js',
            //'app/studio/**/*.js': 'coverage'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['story', 'html', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'test/coverage/'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox' /*, 'Chrome' */],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};