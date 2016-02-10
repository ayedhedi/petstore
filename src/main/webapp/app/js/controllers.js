/**
 * Created by ayed.h on 10/02/2016.
 */

'use strict';

angular.module('myApp.vLogin', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'ViewLoginCtrl'
        });
    }])

    .controller('ViewLoginCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService'
        ,function($scope, $rootScope, $location, AuthenticationService) {
            // reset login status
            AuthenticationService.ClearCredentials();
            $scope.login = function () {
                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function(response) {
                    if(response.success) {
                        $location.path('/pets');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
        }]);

angular.module('myApp.pets', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/pets', {
            templateUrl: 'partials/pets.html',
            controller: 'PetsCtrl'
        });
    }])

    .controller('PetsCtrl', function($scope, GetAllPet) {
        $scope.data = null;
        GetAllPet.getData(function(dataResponse) {
            $scope.data = dataResponse;
            console.log(dataResponse);
        });
    });



