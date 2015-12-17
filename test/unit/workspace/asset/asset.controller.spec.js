'use strict';

/* jshint -W098, -W117 */
/** @namespace $scope.viewModel */

describe('Unit: Testing Asset Controller', function () {
    /**
     * SETUP
     */
    var $controller,
        scope,
        $rootScope,
        mockAssetContentFactory,
        mockRegistrationFactory,
        $q,
        $log,
        $httpBackend,
        $mdDialog,
        $location,
        succeedPromise,
        assetController;

    var question = {'layout': null, 'statementProportion': 25, 'statementResources': [], 'answers': [ {'id': 1, 'correct': true, 'resources': []}]};

    function MockAssetContentFactory() {
        return {
            currentAsset: {'id': 2011101},
            fetchQuestionContent: jasmine.createSpy('fetchQuestionContent').and.callFake(function () {
                if (succeedPromise) {
                    return {
                        success: function (callback) {
                            callback(question);
                            return this;
                        },
                        then: function (callback) {
                            callback({});
                            return this;
                        },
                        error: function() {
                            return this;
                        }
                    };
                } else {
                    return {
                        success: function () {
                            return this;
                        },
                        then: function (callback) {
                            callback({});
                            return this;
                        },
                        error: function (callback) {
                            callback({});
                            return this;
                        }
                    };
                }
            }),
            insertQuestionContent: jasmine.createSpy('insertQuestionContent').and.callFake(function () {
                if (succeedPromise) {
                    return {
                        success: function (callback) {
                            callback(question);
                            return this;
                        },
                        then: function (callback) {
                            callback({});
                            return this;
                        },
                        error: function() {
                            return this;
                        }
                    };
                } else {
                    return {
                        success: function () {
                            return this;
                        },
                        then: function (callback) {
                            callback({});
                            return this;
                        },
                        error: function (callback) {
                            callback({});
                            return this;
                        }
                    };
                }
            })
        };
    }

    function createController() {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        assetController = $controller('Asset as viewModel', {
            $rootScope: $rootScope,
            $scope: scope
        });
    }

    describe('Scenarios', function () {

        beforeEach(module('app'));
        beforeEach(module('app.workspace'));
        beforeEach(module('app.workspace.asset'));

        beforeEach(module(function ($provide) {
            $provide.factory('assetContentFactory', MockAssetContentFactory);
        }));

        beforeEach(inject(function(_$rootScope_, _$controller_, _assetContentFactory_, _$q_, _$log_) { // get all dependences
            $rootScope = _$rootScope_;
            $rootScope.userDetails = {};
            scope = $rootScope.$new();

            mockAssetContentFactory = _assetContentFactory_;
            $controller = _$controller_;
            $q = _$q_;
            $log = _$log_;
            createController();

            spyOn($log, 'debug');
            spyOn($rootScope, '$broadcast');

        }));

        /**
         * TESTS
         */
        it('should be created successfully', function () {
            expect(assetController).toBeDefined();
        });

        describe('Asset controller Properties', function () {
            it('should provide a questionType property', function () {
                expect(assetController.QuestionType).toBeDefined();
                expect(assetController.QuestionType).toBeObject();
            });
        });

        describe('Asset controller initialization', function () {
            it('should call factory to fetch current asset', function () {
                expect(mockAssetContentFactory.fetchQuestionContent).toHaveBeenCalled();
            });

            it('should log error when fetchquestion return an error', function () {
                succeedPromise = false;
                createController();
                expect($log.debug).toHaveBeenCalledWith('nok question' + mockAssetContentFactory.currentAsset.id);
            });

            it('should initialize selected asset when fetchquestion return a success', function () {
                // GIVEN
                succeedPromise = true;
                // WHEN
                createController();
                // THEN
                expect(question.statementResources).toBeUndefined();
                expect(question.statement.resources).toBeDefined();


                expect(assetController.selectedAsset).toEqual(question);
                expect(assetController.selectedAsset.layout).toEqual(conf.Layout.DEFAULT);
                expect(assetController.statementRatio).toEqual(question.statementProportion);

                expect($log.debug).toHaveBeenCalledWith('QUESTION ' + question);
                expect($rootScope.$broadcast).toHaveBeenCalledWith('event:enterAssetView');

            });

            xit('should should change correct answer', function () {
                // GIVEN
                succeedPromise = true;
                // WHEN
                createController();
                // THEN
                assetController.changeCorrectAnswer(1);
                expect(assetController.selectedAsset.answers[0].correct).toBe(false);
            });
        });
    });

});