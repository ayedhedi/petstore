/**
 * Created by ayed.h on 17/02/2016.
 */

petMod

    .controller('PetCtrl', function($scope, $routeParams, PetsApi) {
        PetsApi.getPetDetails(function(dataResponse) {
            console.log(dataResponse);
            $scope.pet = dataResponse;
        }, $routeParams.petId);
    })

;

