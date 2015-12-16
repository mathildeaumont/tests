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
        mockAuthenticationFactory,
        mockRegistrationFactory,
        $q,
        $log,
        $httpBackend,
        $mdDialog,
        $location,
        succeedPromise,
        homeController;

    // For simple $http call, you should use $httpBackend to setup the test
    // http://stackoverflow.com/questions/23731637/test-a-controller-with-success-and-error
    function MockAuthenticationFactory() {
        return {
            sendAuthentication: jasmine.createSpy('sendAuthentication').and.callFake(function (userLogin) {
                var deferred = $q.defer();
                if (succeedPromise) {
                    deferred.resolve({
                        data: {
                            username: userLogin
                        }
                    });
                } else {
                    deferred.reject({
                        data: {
                            errorMessage: 'Empty'
                        }
                    });
                }
                return deferred.promise;
            }),
            retrieveUserDetailsInSession: jasmine.createSpy('retrieveUserDetailsInSession').and.callFake(function () {})
        };
    }

    function MockRegistrationFactory() {
        return {
            registerUser: jasmine.createSpy('registerUser').and.callFake(function () {
                if (succeedPromise) {
                    return {
                        success: function (callback) {
                            callback({});
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
            recoverPassword: jasmine.createSpy('recoverPassword').and.callFake(function (login, email) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            })
        };
    }

    function createController() {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        homeController = $controller('Home as viewModel', {
            $rootScope: $rootScope,
            $scope: scope
        });
    }

    afterEach(function () {
        //console.log($log.debug.logs);
    });

    describe('Scenarios', function () {

        beforeEach(module('app.home'));

        beforeEach(module(function ($provide) {
            $provide.factory('authenticationFactory', MockAuthenticationFactory);
            $provide.factory('registrationFactory', MockRegistrationFactory);
        }));

        beforeEach(inject(function(_$rootScope_, _$httpBackend_, _authenticationFactory_, _registrationFactory_, _$controller_,  _$q_, _$log_, _$location_, _$mdDialog_) { // get all dependences
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();

            $httpBackend = _$httpBackend_;
            mockAuthenticationFactory = _authenticationFactory_;
            mockRegistrationFactory = _registrationFactory_;
            $controller = _$controller_;
            $q = _$q_;
            $log = _$log_;
            $location = _$location_;
            $mdDialog = _$mdDialog_;

            createController();

        }));

        beforeEach(function() {
            spyOn($mdDialog, 'show');
            spyOn($location, 'path');
        });

        /**
         * TESTS
         */
        it('should be created successfully', function () {
            expect(homeController).toBeDefined();
        });

        describe('Home controller Properties', function () {
            it('should provide a user property', function () {
                expect(homeController.user).toBeDefined();
                expect(homeController.user).toBeObject();

                expect(homeController.user.login).toBeDefined();
                expect(typeof homeController.user.login).toBe('string');

                expect(homeController.user.password).toBeDefined();
                expect(typeof homeController.user.password).toBe('string');
            });


            it('should provide a forgetUser property', function () {
                expect(homeController.forgetUser).toBeDefined();
                expect(homeController.forgetUser instanceof Object).toBe(true);

                expect(homeController.forgetUser.login).toBeDefined();
                expect(typeof homeController.forgetUser.login).toBe('string');

                expect(homeController.forgetUser.email).toBeDefined();
                expect(typeof homeController.forgetUser.email).toBe('string');
            });

            it('should provide a newUser property', function () {
                expect(homeController.newUser).toBeDefined();
                expect(homeController.newUser instanceof Object).toBe(true);

                expect(homeController.newUser.firstName).toBeDefined();
                expect(typeof homeController.newUser.firstName).toBe('string');

                expect(homeController.newUser.lastName).toBeDefined();
                expect(typeof homeController.newUser.lastName).toBe('string');

                expect(homeController.newUser.login).toBeDefined();
                expect(typeof homeController.newUser.login).toBe('string');

                expect(homeController.newUser.password).toBeDefined();
                expect(typeof homeController.newUser.password).toBe('string');

                expect(homeController.newUser.confirmPassword).toBeDefined();
                expect(typeof homeController.newUser.confirmPassword).toBe('string');

                expect(homeController.newUser.email).toBeDefined();
                expect(typeof homeController.newUser.email).toBe('string');
            });
        });


        describe('Home controller Methods', function () {
           describe('logUser Method', function () {
               it('should provide a logUser function', function () {
                    expect(typeof homeController.logUser).toBe('function');
                });

              it('should call sendAuthentication with user credentials stored in controller\'s scope when logUser is called', function () {
                    //Given
                    //Instantiate a new controller with successful promise
                    succeedPromise = true;
                    createController();
                    var login = 'test',
                        password = 'test';
                    homeController.user = {
                        login: login,
                        password: password
                    };

                    //When
                    homeController.logUser();

                    //Then
                    expect(mockAuthenticationFactory.sendAuthentication).toHaveBeenCalledWith(login, password);
                });

                it('should store in rootScope the user details and authorization after a successful promise', function () {
                    //Given
                    //Instantiate a new controller with successful promise
                    succeedPromise = true;
                    createController();
                    var login = 'userlogin',
                        password = 'userpassword',
                        authorization = btoa(login + ':' + password);
                    homeController.user = {
                        login: login,
                        password: password
                    };

                    //When
                    homeController.logUser();
                    //To resolve a promise in a test, we have to call $digest() on the current scope
                    //This propagate promise resolution to 'then'
                    scope.$digest();

                    //Then
                    expect($rootScope.userDetails).toBeObject();
                    expect($rootScope.userDetails.username).toBeString();
                    expect($rootScope.userDetails.username).toEqual(login);
                    expect($rootScope.userDetails.authorization).toBeString();
                    expect($rootScope.userDetails.authorization).toEqual(authorization);

                });

                it('should call show from $mdDialog when user and password are incorrect after logUser is called', function () {
                    //Given
                    //Instantiate a new controller with failed promise
                    succeedPromise = false;
                    createController();
                    var login = 'badLogin',
                        password = 'badPassword';
                    homeController.user = {
                        login: login,
                        password: password
                    };

                    //When
                    homeController.logUser();
                    //To resolve a promise in a test, we have to call $digest() on the current scope
                    //This propagate promise resolution to 'then'
                    scope.$digest();

                    //Then
                    expect($mdDialog.show).toHaveBeenCalled();
                });

                it('should redirect to /workspace after a successful call to logUser', function () {
                    //Given
                    //Instantiate a new controller with successful promise
                    succeedPromise = true;
                    createController();
                    var login = 'userlogin',
                        password = 'userpassword';
                    homeController.user = {
                        login: login,
                        password: password
                    };

                    //When
                    homeController.logUser();
                    //To resolve a promise in a test, we have to call $digest() on the current scope
                    //This propagate promise resolution to 'then'
                    scope.$digest();

                    //Then
                    expect($location.path).toHaveBeenCalledWith('workspace');
                });
            });

            describe('sendPassword Method', function() {
                it('should provide a sendPassword function', function () {
                    expect(typeof homeController.sendPassword).toBe('function');
                });

                it('should call recoverPassword function from registrationFactory with user login and email when sendPassword is called', function () {
                    //Given
                    var login = 'test',
                        email = 'test@test.com';
                    homeController.forgetUser = {
                        login: login,
                        email: email
                    };

                    //When
                    homeController.sendPassword();

                    //Then
                    expect(mockRegistrationFactory.recoverPassword).toHaveBeenCalledWith(login, email);
                });

                it('should call show function from $mdDialog when sendPassword is called successfully', function () {
                    //Given
                    succeedPromise = true;
                    createController();
                    var login = 'test',
                        email = 'test@test.com';
                    homeController.forgetUser = {
                        login: login,
                        email: email
                    };

                    //When
                    homeController.sendPassword();
                    //To resolve a promise in a test, we have to do a $digest(),
                    //This propagate promise resolution to 'then'
                    scope.$digest();

                    //Then
                    expect($mdDialog.show).toHaveBeenCalled();
                });

                it('should call show function from $mdDialog when calling sendPassword failed ', function () {
                    //Given
                    succeedPromise = false;
                    createController();
                    var login = 'test',
                        email = 'test@test.com';
                    homeController.forgetUser = {
                        login: login,
                        email: email
                    };

                    //When
                    homeController.sendPassword();
                    //To resolve a promise in a test, we have to do a $digest(),
                    //This propagate promise resolution to 'then'
                    scope.$digest();

                    //Then
                    expect($mdDialog.show).toHaveBeenCalled();
                });

            });

            describe('saveUser Method', function() {
                it('should provide a saveUser function', function () {
                    expect(typeof homeController.saveUser).toBe('function');
                });

                it('should call registerUser function from registrationFactory with user login, email, password, firstname and lastname when sendUser is called', function () {
                    //Given
                    var login = 'test',
                        password = 'testpass',
                        email = 'test@test.com',
                        firstName = 'first',
                        lastName = 'last';
                    homeController.newUser = {
                        login: login,
                        password: password,
                        email: email,
                        firstName: firstName,
                        lastName: lastName
                    };

                    //When
                    homeController.saveUser();

                    //Then
                    expect(mockRegistrationFactory.registerUser).toHaveBeenCalledWith(login, password, firstName, lastName, email);
                });

                it('should call show function from $mdDialog when saveUser is called successfully', function () {
                    //Instantiate a new controller with successful promise
                    succeedPromise = true;
                    createController();
                    //Given
                    var login = 'test',
                        password = 'testpass',
                        email = 'test@test.com',
                        firstName = 'first',
                        lastName = 'last';
                    homeController.newUser = {
                        login: login,
                        password: password,
                        email: email,
                        firstName: firstName,
                        lastName: lastName
                    };
                    //When
                    homeController.saveUser();
                    //To resolve a promise in a test, we have to do a $digest(),
                    //This propagate promise resolution to 'then'
                    scope.$digest();

                    //Then
                    expect($mdDialog.show).toHaveBeenCalled();
                });

                it('should call show function from $mdDialog when calling saveUser failed', function () {
                    //Instantiate a new controller with successful promise
                    succeedPromise = false;
                    createController();
                    //Given
                    var login = 'test',
                        password = 'testpass',
                        email = 'test@test.com',
                        firstName = 'first',
                        lastName = 'last';
                    homeController.newUser = {
                        login: login,
                        password: password,
                        email: email,
                        firstName: firstName,
                        lastName: lastName
                    };
                    //When
                    homeController.saveUser();
                    //To resolve a promise in a test, we have to do a $digest(),
                    //This propagate promise resolution to 'then'
                    scope.$digest();

                    //Then
                    expect($mdDialog.show).toHaveBeenCalled();
                });
            });

            describe('showRegister Method', function() {
                it('should provide a showRegister function', function () {
                    expect(typeof homeController.showRegister).toBe('function');
                });

                it('should call show function from $mdDialog when showRegister is called', function () {
                    //Given

                    //When
                    homeController.showRegister();

                    //Then
                    expect($mdDialog.show).toHaveBeenCalled();
                });
            });

            describe('showForgetPassword Method', function() {
                it('should provide a showForgetPassword function', function () {
                    expect(typeof homeController.showForgetPassword).toBe('function');
                });

                it('should call show function from $mdDialog when showForgetPassword is called', function () {
                    //Given

                    //When
                    homeController.showForgetPassword();

                    //Then
                    expect($mdDialog.show).toHaveBeenCalled();
                });
            });
        });
    });
});