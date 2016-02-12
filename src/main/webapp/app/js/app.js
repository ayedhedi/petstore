'use strict';
var url_base = "http://localhost:8080/api";

// Declare app level module which depends on views, and components
var petStoreApp = angular.module('petStoreApp', [
  'ngRoute',
  'ngCookies',
  'myApp.version'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'ViewLoginCtrl'
            })
            .when('/pets', {
                templateUrl: 'partials/pets.html',
                controller: 'PetsCtrl'
            })
            .when('/pet/:petId', {
                templateUrl: 'partials/petDetails.html',
                controller: 'PetDetailsCtrl'
            })
            .when('/addPet', {
                templateUrl: 'partials/createPet.html',
                controller: 'CreatePetCtrl'
            })
            .otherwise({redirectTo: '/login'});
    }])

    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.authdata = $cookieStore.get('authdata') || {};
            if ($rootScope.authdata) {
                $http.defaults.headers.common['Authorization'] =  $rootScope.authdata;
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                if ($location.path() !== '/login' && !$rootScope.authdata) {
                    $location.path('/login');
                }
            });
        }
    ]);


