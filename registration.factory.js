'use strict';
/* global conf, WEBSERVICE_HOST */
(function () {
    angular
        .module('app.registration')
        .factory('registrationFactory', ['$http', registrationFactory]);

    function registrationFactory($http) {
        /***************
         * DECLARATIONS
         **************/
        var factory = {
            registerUser: registerUser,
            recoverPassword: recoverPassword
        };

        return factory;

        /******************
         * IMPLEMENTATIONS
         *****************/

        /**
         * @ngdoc method
         * @name registerUser
         * @methodOf registrationFactory
         * @description
         *  Register a user in Capico
         *
         * @param {string} login
         * @param {string} password
         * @param {string} firstName
         * @param {string} lastName
         * @param {string} email
         * @returns HttpPromise
         */
        function registerUser(login, password, firstName, lastName, email) {
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

            return $http.post(conf.HTTP_PROTOCOL + WEBSERVICE_HOST + conf.URL_JOOQ_REGISTER_USER, newUser);
        }

        /**
         * @ngdoc method
         * @name recoverPassword
         * @methodOf registrationFactory
         * @description
         *  Send a mail with password to user
         *
         * @param {string} login
         * @param {string} email
         * @returns HttpPromise
         */
        function recoverPassword(login, email) {
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
            return $http.post(conf.HTTP_PROTOCOL + WEBSERVICE_HOST + conf.URL_JOOQ_RECOVER_USER, payload);
        }
    }
})();
