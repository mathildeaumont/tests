'use strict';

xdescribe('Unit: Testing TreeMenu Factory', function () {
    var $rootScope, $httpBackend, TreeMenuFactory, result, response;

    beforeEach(function () {
        module('app.workspace');

        inject(function (_$rootScope_, _$httpBackend_, _TreeMenuFactory_) {
            $httpBackend = _$httpBackend_;
            TreeMenuFactory = _TreeMenuFactory_;
            $rootScope = _$rootScope_;
        });

        result = {};
        response = {};
    });

    describe('TreeMenu Factory', function () {

        describe('Properties', function () {
            it('should provide a rootTree property', function () {
                expect(TreeMenuFactory.rootTree).toBeDefined();
                expect(TreeMenuFactory.rootTree instanceof Object).toBe(true);
            });

            it('should provide a openFolder property', function () {
                expect(TreeMenuFactory.openFolder).toBeDefined();
                expect(TreeMenuFactory.openFolder instanceof Object).toBe(true);
            });

        });

        describe('Methods', function () {
            it('should provide a fetchTree function', function () {
                expect(typeof TreeMenuFactory.fetchTree).toBe('function');
            });

            it('should make succes callback when the request is send', function () {
                response = {
                    'folders': {},
                    'courses': {}
                };

                TreeMenuFactory.fetchTree(0, btoa('cnorris:cnorris1'));


            });

            it('should fill the rootTree with an well formed object', function () {
                response = {
                    'folders': {},
                    'courses': {}
                };
                $httpBackend.expectGET(/.*/).respond(response);
                TreeMenuFactory.fetchTree(1, 'Basic');
                $httpBackend.flush();

                $rootScope.$digest();
                expect(TreeMenuFactory.rootTree).toEqual(response);
            });

            it('should call a broadcast on the rootScope', function () {
                var eventEmitted = false;
                $rootScope.$on('eventTreeFetched',function(){
                    eventEmitted = true;
                });
                $httpBackend.expectGET(/.*/).respond(response);
                TreeMenuFactory.fetchTree(1, 'Basic');
                $httpBackend.flush();

                //$rootScope.$digest();

                expect(eventEmitted).toBe(true);
            });

        });
    });

});