/**
 * Created by ayed.h on 10/02/2016.
 */
'use strict';

/** ************************************************************************************************************
 *                                          LOGIN Module & Services
 *************************************************************************************************************** */

angular.module('myApp.restApi',[]).service('GetAllPet', function($http,$rootScope) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function(callbackFunc) {
        console.log($rootScope.authdata);
        $http({
            method: 'GET',
            url: 'http://localhost:8080/pet',
            headers: {'Authorization': $rootScope.authdata}
        }).success(function(data){
            callbackFunc(data);
        }).error(function(e){
            console.log('Error');
        });
    }
});


/** ************************************************************************************************************
 *                                          LOGIN Module & Services
 *************************************************************************************************************** */
angular.module('myApp.vLogin')
    .factory('AuthenticationService',
        ['$cookieStore', '$rootScope', '$timeout',
            function ($cookieStore, $rootScope, $timeout) {
                var service = {};
                service.Login = function (username, password, callback) {
                    $timeout(function(){
                        var response = { success: username === 'user1' && password === 'secret1' };
                        if(!response.success) {
                            response.message = 'Username or password is incorrect';
                        }else {
                            $rootScope.authdata = "Basic dXNlcjE6c2VjcmV0MQ=="; //TODO: change this !!
                            $cookieStore.put('authdata', $rootScope.authdata);
                        }
                        callback(response);
                    }, 1000);
                };

                service.ClearCredentials = function () {
                    $rootScope.authdata = {};
                    $cookieStore.remove('authdata');
                };

                return service;
            }])
   ;