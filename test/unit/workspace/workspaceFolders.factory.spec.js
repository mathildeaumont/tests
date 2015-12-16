'use strict';

/* jshint -W098, -W117 */

describe('Unit: Testing Workspace Folder Factory', function () {

    var workspaceFoldersFactory, $httpBackend, result, response, errorStatus, handler;

    beforeEach(function () {
        module('app.workspace');

        inject(function (_$httpBackend_, _workspaceFoldersFactory_) {
            $httpBackend = _$httpBackend_;
            workspaceFoldersFactory = _workspaceFoldersFactory_;
        });

        result = {};
        response = {};
        errorStatus = '';
        handler = {
            success: function (data) {
                result = data.data;
            },
            error: function (data) {
                errorStatus = data.data;
            }
        };
        spyOn(handler, 'success').and.callThrough();
        spyOn(handler, 'error').and.callThrough();
    });


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Workspacefolders factory Properties', function () {
        it('should provide a factory property', function () {
            expect(workspaceFoldersFactory).toBeDefined();
            expect(workspaceFoldersFactory).toBeObject();

            expect(workspaceFoldersFactory.duplicateFolder).toBeDefined();
            expect(workspaceFoldersFactory.fetchRootDirectory).toBeDefined();
            expect(workspaceFoldersFactory.fetchDirectoryFolders).toBeDefined();
            expect(workspaceFoldersFactory.moveFolder).toBeDefined();
            expect(workspaceFoldersFactory.fetchDirectoryDetails).toBeDefined();
            expect(workspaceFoldersFactory.updateFolder).toBeDefined();
            expect(workspaceFoldersFactory.createWorkspaceFolder).toBeDefined();
            expect(workspaceFoldersFactory.createFolder).toBeDefined();
        });
    });

    describe('Workspace Folder Factory', function () {

        describe('Method fetchRootDirectory ', function () {
            it('should provide a fetchRootDirectory function', function () {
                expect(typeof workspaceFoldersFactory.fetchRootDirectory).toBe('function');
            });

            it('should call the Api', function () {
                $httpBackend.expectGET(/.*/).respond();
                workspaceFoldersFactory.fetchRootDirectory();
                $httpBackend.flush();
            });

            it('should return a json on success', function () {
                response = {
                    '999583': {
                        'pkFolId': 999583,
                        'folName': 'test',
                        'folCreator': 'nmaupu',
                        'folPublishedDate': 1233410514000
                    }
                };

                $httpBackend.expectGET(/.*/).respond(response);
                workspaceFoldersFactory.fetchRootDirectory().then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.success).toHaveBeenCalled();
                expect(result).toEqual(response);
                expect(handler.error).not.toHaveBeenCalled();
                expect(errorStatus).toEqual('');

            });

            it('should return the status on error', function () {
                $httpBackend.whenGET(/.*/).respond(404, {status: 404});
                workspaceFoldersFactory.fetchRootDirectory(1).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.error).toHaveBeenCalled();
                expect(errorStatus.status).toEqual(404);
                expect(handler.success).not.toHaveBeenCalled();
                expect(result).toEqual({});
            });
        });

        describe('Method fetchDirectoryFolders ', function () {
            it('should provide a fetchDirectoryFolders function', function () {
                expect(typeof workspaceFoldersFactory.fetchDirectoryFolders).toBe('function');
            });

            it('should call the Api', function () {
                $httpBackend.expectGET(/.*/).respond();
                workspaceFoldersFactory.fetchDirectoryFolders();
                $httpBackend.flush();
            });

            it('should return a json on success', function () {
                response = {
                    '1017198': {
                        'pkFolId': 1017198,
                        'folCreator': 'cnorris',
                        'folName': 'A',
                        'folOrder': 2,
                        'folPublishedDate': 1435848976000,
                        'fkFolParentId': 1017197
                    }
                };

                $httpBackend.expectGET(/.*/).respond(response);
                workspaceFoldersFactory.fetchDirectoryFolders(1017198).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.success).toHaveBeenCalled();
                expect(result).toEqual(response);
                expect(handler.error).not.toHaveBeenCalled();
                expect(errorStatus).toEqual('');
            });

            it('should return the status on error', function () {
                $httpBackend.whenGET(/.*/).respond(404, {status: 404});
                workspaceFoldersFactory.fetchDirectoryFolders(1).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.error).toHaveBeenCalled();
                expect(errorStatus.status).toEqual(404);
                expect(handler.success).not.toHaveBeenCalled();
                expect(result).toEqual({});
            });
        });

        describe('Method moveFolder ', function () {
            it('should provide a moveFolder function', function () {
                expect(typeof workspaceFoldersFactory.moveFolder).toBe('function');
            });

            it('should call the Api', function () {
                $httpBackend.expectPOST(/.*/).respond();
                workspaceFoldersFactory.moveFolder();
                $httpBackend.flush();
            });

            it('should return a json on success', function () {
                response = {};

                $httpBackend.whenPOST(/.*/).respond(response);
                workspaceFoldersFactory.moveFolder(1,2).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.success).toHaveBeenCalled();
                expect(result).toEqual(response);
                expect(handler.error).not.toHaveBeenCalled();
                expect(errorStatus).toEqual('');
            });

            it('should return the status on error', function () {
                $httpBackend.whenPOST(/.*/).respond(404, {status: 404});
                workspaceFoldersFactory.moveFolder(1, 2).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.error).toHaveBeenCalled();
                expect(errorStatus.status).toEqual(404);
                expect(handler.success).not.toHaveBeenCalled();
                expect(result).toEqual({});
            });
        });

        describe('Method duplicateFolder ', function () {
            it('should provide a duplicateFolder function', function () {
                expect(typeof workspaceFoldersFactory.duplicateFolder).toBe('function');
            });

            it('should call the Api', function () {
                $httpBackend.expectPOST(/.*/).respond();
                workspaceFoldersFactory.duplicateFolder();
                $httpBackend.flush();
            });

            it('should return a json on success', function () {
                response = {};

                $httpBackend.whenPOST(/.*/).respond(response);
                workspaceFoldersFactory.duplicateFolder(1,2).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.success).toHaveBeenCalled();
                expect(result).toEqual(response);
                expect(handler.error).not.toHaveBeenCalled();
                expect(errorStatus).toEqual('');
            });

            it('should return the status on error', function () {
                $httpBackend.whenPOST(/.*/).respond(404, {status: 404});
                workspaceFoldersFactory.duplicateFolder(1, 2).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.error).toHaveBeenCalled();
                expect(errorStatus.status).toEqual(404);
                expect(handler.success).not.toHaveBeenCalled();
                expect(result).toEqual({});
            });
        });

        describe('Method fetchDirectoryDetails', function () {
            it('should provide a fetchDirectoryDetails function', function () {
                expect(typeof workspaceFoldersFactory.fetchDirectoryDetails).toBe('function');
            });

            it('should call the Api', function () {
                $httpBackend.expectGET(/.*/).respond();
                workspaceFoldersFactory.fetchDirectoryDetails();
                $httpBackend.flush();
            });

            it('should return a json on success', function () {
                response = {
                    '1017198': {
                        'pkFolId': 1017198,
                        'folCreator': 'cnorris',
                        'folName': 'A',
                        'folOrder': 2,
                        'folPublishedDate': 1435848976000,
                        'fkFolParentId': 1017197
                    }
                };

                $httpBackend.expectGET(/.*/).respond(response);
                workspaceFoldersFactory.fetchDirectoryFolders(1017198).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.success).toHaveBeenCalled();
                expect(result).toEqual(response);
                expect(handler.error).not.toHaveBeenCalled();
                expect(errorStatus).toEqual('');
            });

            it('should return the status on error', function () {
                $httpBackend.whenGET(/.*/).respond(404, {status: 404});
                workspaceFoldersFactory.fetchDirectoryFolders(1).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.error).toHaveBeenCalled();
                expect(errorStatus.status).toEqual(404);
                expect(handler.success).not.toHaveBeenCalled();
                expect(result).toEqual({});
            });
        });

        describe('Method updateFolder ', function () {
            it('should provide a updateFolder function', function () {
                expect(typeof workspaceFoldersFactory.updateFolder).toBe('function');
            });

            it('should call the Api', function () {
                $httpBackend.expectPOST(/.*/).respond();
                workspaceFoldersFactory.updateFolder();
                $httpBackend.flush();
            });

            it('should return a json on success', function () {
                response = {};

                $httpBackend.whenPOST(/.*/).respond(response);
                workspaceFoldersFactory.updateFolder(1017198).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.success).toHaveBeenCalled();
                expect(result).toEqual(response);
                expect(handler.error).not.toHaveBeenCalled();
                expect(errorStatus).toEqual('');
            });

            it('should return the status on error', function () {
                $httpBackend.whenPOST(/.*/).respond(404, {status: 404});
                workspaceFoldersFactory.updateFolder(1017198).then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.error).toHaveBeenCalled();
                expect(errorStatus.status).toEqual(404);
                expect(handler.success).not.toHaveBeenCalled();
                expect(result).toEqual({});
            });
        });

        describe('Method createFolder ', function () {
            it('should provide a updateFolder function', function () {
                expect(typeof workspaceFoldersFactory.createFolder).toBe('function');
            });

            it('should call the Api', function () {
                $httpBackend.expectPOST(/.*/).respond();
                workspaceFoldersFactory.createFolder();
                $httpBackend.flush();
            });

            it('should return a json on success', function () {
                response = {};

                $httpBackend.whenPOST(/.*/).respond(response);
                workspaceFoldersFactory.createFolder().then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.success).toHaveBeenCalled();
                expect(result).toEqual(response);
                expect(handler.error).not.toHaveBeenCalled();
                expect(errorStatus).toEqual('');
            });

            it('should return the status on error', function () {
                $httpBackend.whenPOST(/.*/).respond(404, {status: 404});
                workspaceFoldersFactory.createFolder().then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.error).toHaveBeenCalled();
                expect(errorStatus.status).toEqual(404);
                expect(handler.success).not.toHaveBeenCalled();
                expect(result).toEqual({});
            });
        });

        describe('Method createWorkspaceFolder ', function () {
            it('should provide a updateFolder function', function () {
                expect(typeof workspaceFoldersFactory.createWorkspaceFolder).toBe('function');
            });

            it('should call the Api', function () {
                $httpBackend.expectPOST(/.*/).respond();
                workspaceFoldersFactory.createWorkspaceFolder();
                $httpBackend.flush();
            });

            it('should return a json on success', function () {
                response = {};

                $httpBackend.whenPOST(/.*/).respond(response);
                workspaceFoldersFactory.createWorkspaceFolder().then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.success).toHaveBeenCalled();
                expect(result).toEqual(response);
                expect(handler.error).not.toHaveBeenCalled();
                expect(errorStatus).toEqual('');
            });

            it('should return the status on error', function () {
                $httpBackend.whenPOST(/.*/).respond(404, {status: 404});
                workspaceFoldersFactory.createWorkspaceFolder().then(handler.success, handler.error);
                $httpBackend.flush();

                expect(handler.error).toHaveBeenCalled();
                expect(errorStatus.status).toEqual(404);
                expect(handler.success).not.toHaveBeenCalled();
                expect(result).toEqual({});
            });
        });
    });

});