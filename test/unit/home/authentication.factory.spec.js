'use strict';

/* jshint -W098, -W117 */

describe('Unit: Testing Authentication Factory', function () {

    var authenticationFactory, $httpBackend, $sessionStorage;

    beforeEach(module('app.common.authentication'));

    beforeEach(inject(function(_authenticationFactory_, _$httpBackend_, _$sessionStorage_) {
        authenticationFactory = _authenticationFactory_;
        $httpBackend = _$httpBackend_;
        $sessionStorage = _$sessionStorage_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Authentication factory Properties', function () {
        it('should provide a factory property', function () {
            expect(authenticationFactory).toBeDefined();
            expect(authenticationFactory).toBeObject();

            expect(authenticationFactory.isAlreadyLogged).toBeDefined();
            expect(authenticationFactory.isAlreadyLogged).toBe(false);

            expect(authenticationFactory.sendAuthentication).toBeDefined();
            expect(authenticationFactory.retrieveUserDetailsInSession).toBeDefined();
            expect(authenticationFactory.logOutUser).toBeDefined();
        });
    });

    describe('Authentication factory functions', function () {

        describe('sendAuthentication method', function () {

            it('should provide a sendAuthentication function', function () {
                expect(typeof authenticationFactory.sendAuthentication).toBe('function');
            });

            it('should call $http request', function () {

                var username = 'test';
                var password = 'test';

                $httpBackend.expectGET(conf.HTTP_PROTOCOL + WEBSERVICE_HOST + conf.URL_JOOQ_INFO_USER  + username).respond();

                authenticationFactory.sendAuthentication(username, password);

                $httpBackend.flush();
            });

        });

        describe('retrieveUserDetailsInSession method', function () {

            it('should provide a retrieveUserDetailsInSession function', function () {
                expect(typeof authenticationFactory.retrieveUserDetailsInSession).toBe('function');
            });

            it('should return user details when user details not null', function () {
                $sessionStorage.userDetails = {'username': 'test'};
                var details = authenticationFactory.retrieveUserDetailsInSession();
                expect(details).not.toBeNull();
                expect(details).toBeDefined();
                expect(details).toEqual($sessionStorage.userDetails);
            });

            it('should return null when user details null', function () {
                $sessionStorage.userDetails = null;
                var details = authenticationFactory.retrieveUserDetailsInSession();
                expect(details).toBeNull();
            });

            it('should return null when user details not defined', function () {
                $sessionStorage.userDetails = undefined;
                var details = authenticationFactory.retrieveUserDetailsInSession();
                expect(details).toBeNull();
            });

        });

        describe('logOutUser method', function () {

            it('should provide a logOutUser function', function () {
                expect(typeof authenticationFactory.logOutUser).toBe('function');
            });

            it('should reset $sessionStorage.userDetails ', function () {
                $sessionStorage.userDetails = {'username': 'test'};
                expect($sessionStorage.userDetails).toBeDefined();
                authenticationFactory.logOutUser();
                expect($sessionStorage.userDetails).toBeUndefined();
            });

        });


    });
});
