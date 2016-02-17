'use strict';
var url_base = "/api";

// Declare app level module which depends on views, and components
var petStoreApp = angular.module('petStoreApp', [
    'ngRoute',
    'ngCookies',
    'loginMod',
    'petsMod',
    'petMod'
])

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


