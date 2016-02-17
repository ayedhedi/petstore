/**
 * Created by ayed.h on 17/02/2016.
 */

petStoreApp
    .service('PetsApi', function($http,$rootScope) {
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
        };
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
    });