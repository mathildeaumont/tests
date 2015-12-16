/**
 * @ngdoc factory
 * @name authenticationFactory
 *
 * @description
 *  Manage authentication requests.
 *
 * @requires $http
 * */
'use strict';
/* global conf, WEBSERVICE_HOST */
(function () {
    angular
        .module('app.common.authentication', ['ngStorage'])
        .factory('authenticationFactory', ['$http', '$sessionStorage', '$log', authenticationFactory]);

    function authenticationFactory($http, $sessionStorage, $log) {
        /***************
         * DECLARATIONS
         **************/
        var factory = {
            isAlreadyLogged: false,

            sendAuthentication: sendAuthentication,
            retrieveUserDetailsInSession: retrieveUserDetailsInSession,
            logOutUser: logOutUser
        };

        return factory;

        /******************
         * IMPLEMENTATIONS
         *****************/

        /**
         * @ngdoc method
         * @name sendAuthentication
         * @methodOf authenticationFactory
         * @description
         *  Check if the user is registered.
         *
         * @return
         *  If the user exist
         *      200 OK - With user's details
         *  Otherwise
         *      401 UNAUTHORIZED
         */
        function sendAuthentication(username, password) {
            $log.debug('[AuthenticationFactory] sendAuthentication');

            var request = {
                method: 'GET',
                url: conf.HTTP_PROTOCOL + WEBSERVICE_HOST + conf.URL_JOOQ_INFO_USER + username,
                headers: {
                    'Authorization': 'Basic ' + btoa(username + ':' + password)
                }
            };
            return $http(request);
        }

        /**
         * @ngdoc method
         * @name retrieveUserDetailsInSession
         * @methodOf authenticationFactory
         * @description
         *  If the user was already logged in and he pressed refresh, reload the $rootScope with it's credentials.
         *
         * @return
         *  If details are stored in session storage, return them
         *  Otherwise return null
         */
        function retrieveUserDetailsInSession() {
            if ($sessionStorage.userDetails !== null && $sessionStorage.userDetails !== undefined) {
                return $sessionStorage.userDetails;
            }
            return null;
        }

        /**
         * @ngdoc method
         * @name logOut
         * @methodOf workspaceCtrl
         * @description
         *  Log out the user. Delete the session storage
         *
         */
        function logOutUser() {
            return $sessionStorage.$reset();
        }
    }
})();
