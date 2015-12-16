/**
 * @ngdoc controller
 * @name home
 *
 * @description
 *  Home controller manage the home page.
 *      - Authentication
 *      - Registration
 *
 * @requires $location, $scope, $mdDialog, authenticationFactory, registrationFactory, $http, $log
 * */
'use strict';
/* global VERSION */
(function() {
    angular
        .module('app.home')
        .controller('Home', ['$location', '$scope', '$rootScope', '$mdDialog', 'authenticationFactory', 'registrationFactory', '$log', '$sessionStorage', Home]);

    function Home($location, $scope, $rootScope, $mdDialog, authenticationFactory, registrationFactory, $log, $sessionStorage) {
        $log.debug('[app.home] Loading Home controller');

        /***************
         * DECLARATIONS
         **************/

        var viewModel = this,
            userLogin = '',
            userPassword = '';
        viewModel.user = {
            'login': '',
            'password': ''
        };
        viewModel.forgetUser = {
            'login': '',
            'email': ''
        };
        viewModel.newUser = {
            'firstName': '',
            'lastName': '',
            'login': '',
            'password': '',
            'confirmPassword': '',
            'email': ''
        };
        viewModel.version = VERSION;
        viewModel.logUser = logUser;
        viewModel.sendPassword = sendPassword;
        viewModel.saveUser = saveUser;
        viewModel.showRegister = showRegister;
        viewModel.showForgetPassword = showForgetPassword;

        /******************
         * IMPLEMENTATIONS
         *****************/
        /**
         * @ngdoc method
         * @name logUser
         * @methodOf homeCtrl
         * @description
         *  Log the user.
         *  Informations are saved in the root scope :
         *   id, username, firstname, lastname, date of birth, mail, coach, enabledAccount, authorization
         */
        function logUser() {
            $log.debug('[app.home] homeCtrl.logUser : ' + JSON.stringify(viewModel.user));

            userLogin = viewModel.user.login;
            userPassword = viewModel.user.password;

            authenticationFactory
                .sendAuthentication(userLogin, userPassword)
                .then(saveInformationsAndRedirect, displayAuthenticationErrorMessage);
        }

        /**
         * @ngdoc method
         * @name sendPassword
         * @methodOf homeCtrl
         * @description
         *  Send the password of a user to the email if they both match in the database
         *
         */
        function sendPassword() {
            $log.debug('[app.home] homeCtrl.sendPassword : ' + JSON.stringify(viewModel.forgetUser));

            registrationFactory.recoverPassword(viewModel.forgetUser.login, viewModel.forgetUser.email)
                .then(function() {
                    $mdDialog.show($mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Mail envoyé')
                            .content('Vous allez recevoir un mail.')
                            .ok('Ok !')
                    );
                }, function(data) {
                    $log.debug('ERROR - [app.home] homeCtrl.sendPassword : ' + JSON.stringify(data));
                    $mdDialog.show($mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Nom d\'utilisateur non trouvé.')
                            .content('Vérifiez le nom d\'utilsateur et recommencez.')
                            .ok('Ok !')
                    );
                }
            );
        }

        /**
         * @ngdoc method
         * @name saveUser
         * @methodOf homeCtrl
         * @description
         *  Register a new user in Capico
         *
         */
        function saveUser() {
            $log.debug('[app.home] homeCtrl.saveUser : ' + JSON.stringify(viewModel.newUser));

            var username = viewModel.newUser.login,
                password = viewModel.newUser.password,
                firstName = viewModel.newUser.firstName,
                lastName = viewModel.newUser.lastName,
                email = viewModel.newUser.email;

            registrationFactory.registerUser(username, password, firstName, lastName, email).success(function() {
                $mdDialog.show($mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Vous êtes inscrits !')
                        .ok('Ok !')
                );
            }).error(function() {
                $mdDialog.show($mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Nom d\'utilisateur déjà pris.')
                        .ok('Ok !')
                );
            });
        }

        function showRegister(ev) {
            $log.debug('[app.home] homeCtrl.showRegister : ' + JSON.stringify(viewModel.newUser));

            viewModel.newUser = {};
            $mdDialog.show({
                //pass the parent scope to the dialog
                scope: $scope,
                preserveScope: true,
                controller: DialogController,
                templateUrl: 'studio/home/views/register.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                targetEvent: ev
            });
        }

        function showForgetPassword(ev) {
            $log.debug('[app.home] homeCtrl.showForgetPassword : ' + JSON.stringify(viewModel.newUser));

            viewModel.forgetUser = {};
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                controller: DialogController,
                templateUrl: 'studio/home/views/forget-password.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                targetEvent: ev
            });
        }

        /********************
         * PRIVATE FUNCTIONS
         *******************/

        function saveInformationsAndRedirect(httpPromise) {
            $log.debug('[app.home] homeCtrl.saveInformations');
            $log.debug('httpPromise : ' + JSON.stringify(httpPromise.data));

            $rootScope.userDetails = httpPromise.data;
            $rootScope.userDetails.authorization = btoa(userLogin + ':' + userPassword);
            $rootScope.currentDirectoryId = 0;
            $sessionStorage.userDetails = $rootScope.userDetails;

            $rootScope.$broadcast('loggedEvent');

            $location.path('workspace');
        }

        function displayAuthenticationErrorMessage(httpPromise) {
            $log.debug('[app.home] homeCtrl.displayAuthenticationErrorMessage');
            $log.debug('httpPromise : ' + JSON.stringify(httpPromise.data));

            $mdDialog.show($mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('La connexion a échoué !')
                    .content('Verifiez votre nom d\'utilisateur et votre mot de passe.')
                    .ok('Retry')
            );
        }
    }

    DialogController.$inject = ['$scope', '$mdDialog'];
    function DialogController($scope, $mdDialog) {
        $scope.answer = function() {
            $mdDialog.hide();
        };
    }
})();
