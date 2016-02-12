/**
 * Created by ayed.h on 12/02/2016.
 */

petStoreApp

    .service('PetsService', function($http,$rootScope) {
        this.getAllPets = function(callbackFunc) {
            $http({
                method: 'GET',
                url: url_base+'/pet',
                headers: {'Authorization': $rootScope.authdata}
            }).success(function(data){
                callbackFunc(data);
            }).error(function(){
                console.log('Error');
            });
        };
        this.getPetDetails = function(callbackFunc, petId) {
            $http({
                method: 'GET',
                url: url_base+'/pet/'+petId,
                headers: {'Authorization': $rootScope.authdata}
            }).success(function(data){
                callbackFunc(data);
            }).error(function(){
                console.log('Error');
            });
        };
        this.createNewPet = function (callbackFunc,pet) {
            $http({
                method: 'POST',
                data: angular.toJson(pet, false),
                url: url_base+'/pet',
                headers: {'Authorization': $rootScope.authdata, 'Content-type':'application/json'},
                transformRequest: angular.identity
            }).success(function(result){
                callbackFunc(result);
            }).error(function(){
                console.log('Error');
            });
        };
        this.deletePet = function(callbackFunc, petId) {
            $http({
                method: 'DELETE',
                url: url_base+'/pet/'+petId,
                headers: {'Authorization': $rootScope.authdata}
            }).success(function(){
                callbackFunc(true);
            }).error(function(){
                callbackFunc(true);
            });
        }
    })


    .service('OpsChecksService', function($http,$rootScope) {
        this.canDeletePet = function(callbackFunc) {
            $http({
                method: 'GET',
                url: url_base+'/user/canDelete',
                headers: {'Authorization': $rootScope.authdata}
            }).success(function(data){
                callbackFunc(data===true);
            }).error(function(){
                return callbackFunc(false);
            });
        };
        this.canCreatePet = function(callbackFunc) {
            $http({
                method: 'GET',
                url: url_base+'/user/canCreate',
                headers: {'Authorization': $rootScope.authdata}
            }).success(function(data){
                callbackFunc(data===true);
            }).error(function(){
                return callbackFunc(false);
            });
        }
    })

    .factory('AuthenticationService', ['$rootScope', '$timeout','$cookieStore',
        function ($rootScope, $timeout,$cookieStore) {
            var service = {};
            service.Login = function (username, password, callback) {
                $timeout(function(){
                    var response = { success: false };
                    //TODO: implements this !!
                    if (username==='user2' && password==='secret2') {
                        $rootScope.authdata = "Basic dXNlcjI6c2VjcmV0Mg==";
                        response.success = true;
                        $cookieStore.put('authdata', $rootScope.authdata);

                    }else if (username==='user1' && password==='secret1') {
                        $rootScope.authdata = "Basic dXNlcjE6c2VjcmV0MQ==";
                        response.success = true;
                        $cookieStore.put('authdata', $rootScope.authdata);

                    }else {
                        $rootScope.authdata = null;
                    }

                    callback(response);
                }, 1000);
            };

            service.ClearCredentials = function () {
                $rootScope.authdata = {};
                $cookieStore.remove('authdata');
            };

            return service;
        }]
    )

;