'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.vLogin',
  'myApp.pets',
  'myApp.restApi',
  'myApp.version'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/login'});
    }])

    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.authdata = $cookieStore.get('authdata') || {};
            if ($rootScope.authdata) {
              //  $http.defaults.headers.common['Authorization'] =  $rootScope.authdata;
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                if ($location.path() !== '/login' && !$rootScope.authdata) {
                    $location.path('/login');
                }
            });
        }
    ]);


