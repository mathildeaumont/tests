'use strict';

/* jshint -W098, -W117 */
/** @namespace $scope.viewModel */

describe('Unit: Testing Home Controller', function () {

    /**
     * SETUP
     */
    var $controller,
        scope,
        $rootScope,
        $q,
        $log,
        $mdDialog,
        $location,
        $httpBackend,
        workspaceController,
        mockWorkspaceCoursesFactory;

    function createController() {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        workspaceController = $controller('Workspace as viewModel', {
            $rootScope: $rootScope,
            $scope: scope
        });
    }

    describe('Scenarios', function () {
        beforeEach(module('app'));

        beforeEach(module('app.workspace'));

        beforeEach(inject(function (_$rootScope_, _$controller_, _$q_, _$log_, _$location_, _$mdDialog_, _workspaceCoursesFactory_, _$httpBackend_) { // get all dependences
            $rootScope = _$rootScope_;
            $rootScope.userDetails = {};
            scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;

            mockWorkspaceCoursesFactory = _workspaceCoursesFactory_;

            $controller = _$controller_;

            $q = _$q_;
            $log = _$log_;
            $location = _$location_;
            $mdDialog = _$mdDialog_;

            createController();

        }));

        beforeEach(function() {
                spyOn(mockWorkspaceCoursesFactory, 'insertCourseContent').and.callThrough();
                spyOn($rootScope, '$broadcast');
            }
        );

        /**
         * TESTS
         */
        it('should be created successfully', function () {
            expect(workspaceController).toBeDefined();
        });

        describe('Workspace controller Properties', function () {
            it('should provide properties', function () {
                expect(workspaceController.selectedDirectoryFolders).toBeDefined();
                expect(workspaceController.selectedDirectoryCourses).toBeDefined();
                expect(workspaceController.selectedCourse).toBeDefined();
                expect(workspaceController.details).toBeDefined();
                expect(workspaceController.isCreatingFolder).toBeDefined();
                expect(workspaceController.isCreatingCourse).toBeDefined();
                expect(workspaceController.newFolderName).toBeDefined();
                expect(workspaceController.mdCol).toBeDefined();
                expect(workspaceController.mdColLg).toBeDefined();
                expect(workspaceController.mdColMd).toBeDefined();
                expect(workspaceController.mdColSm).toBeDefined();
            });

            it('should provide order property', function () {
                expect(workspaceController.order).toBeDefined();
                expect(workspaceController.order).toBeObject();
                expect(workspaceController.order.types).toBeDefined();
                expect(workspaceController.order.types.folCouOrder).toBeDefined();
                expect(typeof workspaceController.order.types.folCouOrder).toBe('string');
                expect(workspaceController.order.types.couName).toBeDefined();
                expect(typeof workspaceController.order.types.couName).toBe('string');
                expect(workspaceController.order.types.folCreator).toBeDefined();
                expect(typeof workspaceController.order.types.folCreator).toBe('string');
                expect(workspaceController.order.types.folPublishedDate).toBeDefined();
                expect(typeof workspaceController.order.types.folPublishedDate).toBe('string');
                expect(workspaceController.order.by).toBeDefined();
                expect(workspaceController.order.reverse).toBeDefined();
                expect(workspaceController.order.menu).toBeDefined();
            });
        });

        describe('Workspace controller methods', function () {

            describe('setSelectedDirectoryId method', function () {

                it('should provide a setSelectedDirectoryId function', function () {
                    expect(typeof workspaceController.setSelectedDirectoryId).toBe('function');
                });

                it('should set the current directory id', function () {
                    workspaceController.setSelectedDirectoryId(101978);
                    expect($rootScope.currentDirectoryId).toEqual(101978);
                });
            });

            describe('createCourse method', function () {

                it('should provide a createCourse function', function () {
                    expect(typeof workspaceController.createCourse).toBe('function');
                });

                it('should do nothing when not in creating course mode', function () {
                    workspaceController.isCreatingCourse = false;
                    workspaceController.createCourse();
                    expect(mockWorkspaceCoursesFactory.insertCourseContent).not.toHaveBeenCalled();
                });

                it('should call insertcoursecontent in creating course mode', function () {
                    workspaceController.isCreatingCourse = true;
                    workspaceController.createCourse();
                    expect(mockWorkspaceCoursesFactory.insertCourseContent).toHaveBeenCalled();
                });
            });
        });
    });

});