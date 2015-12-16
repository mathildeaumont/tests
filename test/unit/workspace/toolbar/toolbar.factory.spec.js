'use strict';

xdescribe('Unit: Testing ToolbarFactory', function () {
    var ToolbarFactory, $httpBackend, result, response, $rootScope;

    beforeEach(function () {
        module('app.workspace');

        inject(function (_$httpBackend_, _ToolbarFactory_, _$rootScope_) {
            $httpBackend = _$httpBackend_;
            ToolbarFactory = _ToolbarFactory_;
            $rootScope = _$rootScope_;
        });

        result = {};
        response = {};
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function() {
        expect(ToolbarFactory).toBeDefined();
    });

    describe('ToolbarFactory methods', function () {
        describe('Method fetchDirectoryPath ', function () {
            it('should provide a fetchDirectoryPath function', function () {
                expect(ToolbarFactory.fetchDirectoryPath).toBeFunction();
            });

            it('should call the Api', function () {
                ToolbarFactory.fetchDirectoryPath();

                $httpBackend.expectGET(/.*/).respond();
                $httpBackend.flush();
            });

            it('should set authorization header when calling the Api', function () {
                //Given
                response = [{'folderId': 1017197, 'folderName': 'TESST'}];
                var directoryId = 10,
                    expectedAuthorization = 'test',
                    expectedHeader = {
                        Authorization: 'Basic ' + expectedAuthorization,
                        Accept: 'application/json, text/plain, */*'
                    };

                //When
                ToolbarFactory.fetchDirectoryPath(directoryId, expectedAuthorization);

                //Then
                $httpBackend.expectGET(/.*/, expectedHeader).respond(200, response);
                $httpBackend.flush();
                $rootScope.$digest();
            });

            it('should set correctly selectedDirectoryPath to given response when http response is ok', function () {
                //Given
                var directoryId = 10,
                    authorization = 'Basic test',
                    httpOk = 200;
                    response = [{'folderId': 1017197, 'folderName': 'TESST'}];

                //When
                ToolbarFactory.fetchDirectoryPath(directoryId, authorization);

                //Then
                $httpBackend.expectGET(/.*/).respond(httpOk, response);
                $httpBackend.flush();
                $rootScope.$digest();
                expect(ToolbarFactory.selectedDirectoryPath).toEqual(response);
                expect(ToolbarFactory.selectedDirectoryPath).toBeArrayOfObjects();
                expect(ToolbarFactory.selectedDirectoryPath).toBeArrayOfSize(1);
            });

            it('should empty selectedDirectoryPath on error', function () {
                //Given
                var httpNotFound = 404,
                    wrongDirectoryId = 10,
                    wrongAuthorization = 'Basic test';

                //When
                ToolbarFactory.fetchDirectoryPath(wrongDirectoryId, wrongAuthorization);
                $httpBackend.whenGET(/.*/).respond(httpNotFound, {status: 404});
                $httpBackend.flush();

                //Then
                expect(ToolbarFactory.selectedDirectoryPath).toBeEmptyObject();
            });
        });
    });
});