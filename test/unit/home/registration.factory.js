'use strict';

/* jshint -W098, -W117 */

describe('Unit: Testing Registration Factory', function () {

    var registrationFactory, $httpBackend;

    beforeEach(module('app.registration'));

    beforeEach(inject(function(_registrationFactory_, _$httpBackend_) {
        registrationFactory = _registrationFactory_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Registration factory Properties', function () {
        it('should provide a factory property', function () {
            expect(registrationFactory).toBeDefined();
            expect(registrationFactory).toBeObject();

            expect(registrationFactory.registerUser).toBeDefined();
            expect(registrationFactory.recoverPassword).toBeDefined();
        });
    });

    describe('Registration factory functions', function () {

        describe('registerUser method', function () {

            it('should provide a registrationFactory function', function () {
                expect(typeof registrationFactory.registerUser).toBe('function');
            });

            it('should call $http request', function () {
                $httpBackend.expectPOST(conf.HTTP_PROTOCOL + WEBSERVICE_HOST + conf.URL_JOOQ_REGISTER_USER).respond(200, '');

                var login = 'test';
                var password = 'testPwd';
                var firstName = 'testFName';
                var lastName = 'testLName';
                var email = 'test@test.fr';

                registrationFactory.registerUser(login, password, firstName, lastName, email);

                $httpBackend.flush();
            });

            it('should call $http request with new user', function () {

                var login = 'test';
                var password = 'testPwd';
                var firstName = 'testFName';
                var lastName = 'testLName';
                var email = 'test@test.fr';

                var newUser = {
                    'username': login,
                    'password': password,
                    'userDetailsWrapper': {
                        'deviceRegistrationID': null,
                        'deviceType': 'Browser',
                        'firstName': firstName,
                        'lastName': lastName,
                        'email1': email
                    },
                    'enabled': 1
                };

                $httpBackend.expectPOST(conf.HTTP_PROTOCOL + WEBSERVICE_HOST + conf.URL_JOOQ_REGISTER_USER, newUser).respond();

                registrationFactory.registerUser(login, password, firstName, lastName, email);

                $httpBackend.flush();
            });

        });

        describe('recoverPassword method', function () {

            it('should provide a recoverPassword function', function () {
                expect(typeof registrationFactory.recoverPassword).toBe('function');
            });

            it('should call $http request', function () {
                $httpBackend.expectPOST(conf.HTTP_PROTOCOL + WEBSERVICE_HOST + conf.URL_JOOQ_RECOVER_USER).respond();

                var login = 'test';
                var email = 'test@test.fr';

                registrationFactory.recoverPassword(login, email);

                $httpBackend.flush();
            });

            it('should call $http request with login and email', function () {

                var login = 'test';
                var email = 'test@test.fr';

                var payload = {
                    username: login,
                    password: null,
                    userDetailsWrapper: {
                        deviceRegistrationID: null,
                        deviceType: 'Browser',
                        firstName: null,
                        lastName: null,
                        email1: email
                    },
                    enabled: 0
                };

                $httpBackend.expectPOST(conf.HTTP_PROTOCOL + WEBSERVICE_HOST + conf.URL_JOOQ_RECOVER_USER, payload).respond();

                registrationFactory.recoverPassword(login, email);

                $httpBackend.flush();
            });

        });


    });
});
