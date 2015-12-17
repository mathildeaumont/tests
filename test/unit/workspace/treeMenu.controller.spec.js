'use strict';

/* jshint -W098, -W117 */

describe('Unit: Testing TreeMenu Controller', function () {
    /**
     * SETUP
     */
    var $controller,
        $rootScope,
        mockWorkspaceFoldersFactory,
        mockWorkspaceCoursesFactory,
        $q,
        $scope = {};

    function MockWorkspaceFoldersFactory() {
        return {
            fetchRootDirectory: jasmine.createSpy('fetchRootDirectory').and.callFake(function (workspaceId, authorization) {
                return {
                    success: function (callback) {
                        return this;
                    },
                    error: function (callback) {
                    }
                };
            }),
            fetchDirectoryFolders: jasmine.createSpy('fetchDirectoryFolders').and.callFake(function (directoryId, authorization) {
                return {
                    success: function (callback) {
                        callback({});
                        return this;
                    },
                    error: function (callback) {
                    }
                };
            })
        };
    }

    function MockWorkspaceCoursesFactory() {
        return {

            fetchDirectoryCourses: jasmine.createSpy('fetchDirectoryCourses').and.callFake(function (directoryId, authorization) {
                return {
                    success: function (callback) {
                        callback({'test': 'test'});
                        return this;
                    },
                    error: function (callback) {
                    }
                };
            }),
            fetchAssetsCourse: jasmine.createSpy('fetchAssetsCourse').and.callFake(function (directoryId, authorization) {
                return {
                    success: function (callback) {
                        callback({});
                        return this;
                    },
                    error: function (callback) {
                    }
                };
            })
        };
    }

    beforeEach(function () {
        // Load controller's module
        module('app');

        // Provide mocks
        module(function ($provide) {
            $provide.factory('workspaceFoldersFactory', MockWorkspaceFoldersFactory);
            $provide.factory('workspaceCoursesFactory', MockWorkspaceCoursesFactory);
        });

        // Inject scope and mocks
        inject(function (_$q_, _$controller_, _$rootScope_, _workspaceFoldersFactory_, _workspaceCoursesFactory_) {
            $rootScope = _$rootScope_;
            $rootScope.userDetails = {'workId': 1, 'authorization': ''};

            $scope = $rootScope.$new();
            mockWorkspaceFoldersFactory = _workspaceFoldersFactory_;
            mockWorkspaceCoursesFactory = _workspaceCoursesFactory_;
            $q = _$q_;

            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_('TreeMenu as viewModel', {
                $scope: $scope,
                $rootScope: $rootScope
            });
        });

    });

    describe('Scenarios', function () {
        /**
         * TESTS
         */

        it('should be created successfully', function () {
            expect($controller).toBeDefined();
        });

        xdescribe('Properties', function () {
            it('should provide a selectedTreeMenuDirectoryId property', function () {
                expect($scope.viewModel.selectedTreeMenuDirectoryId).toBeDefined();
                expect(typeof $scope.viewModel.selectedTreeMenuDirectoryId).toBe('number');
            });

            xit('should provide a rootTree property', function () {
                expect($scope.viewModel.rootTree).toBeDefined();
                expect($scope.viewModel.rootTree instanceof Object).toBe(true);
            });

            xit('should provide a openFolder property', function () {
                expect($scope.viewModel.openFolder).toBeDefined();
                expect($scope.viewModel.openFolder instanceof Object).toBe(true);
                expect($scope.viewModel.openFolder instanceof Object).toBe(true);
            });
        });

        xdescribe('Methods', function () {
            it('should provide a setSelectedTreeMenuDirectoryId function', function () {
                expect(typeof $scope.viewModel.setSelectedTreeMenuDirectoryId).toBe('function');
            });

            it('should set the selectedTreeMenuDirectoryId with the argument id', function () {
                //When
                $scope.viewModel.setSelectedTreeMenuDirectoryId(1);
                //Then
                expect($scope.viewModel.selectedTreeMenuDirectoryId).toEqual(1);
            });


            it('should provide a isEmpty function', function () {
                expect(typeof $scope.viewModel.isEmpty).toBe('function');
            });

            it('should check the emptiness of an object', function () {
                var res = $scope.viewModel.isEmpty({});
                expect(res).toBe(true);
                res = $scope.viewModel.isEmpty({'test': 'test'});
                expect(res).toBe(false);
            });
        });
    });
})
;