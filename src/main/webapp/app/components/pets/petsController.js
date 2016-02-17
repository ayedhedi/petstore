/**
 * Created by ayed.h on 17/02/2016.
 */

petsMod

    .controller('PetsCtrl', function($scope,$route, PetsApi) {
        $scope.pets = null;
        PetsApi.getAllPets(function(dataResponse) {
            $scope.pets = dataResponse;
        });
        PetsApi.canDeletePet(function (result) {
            $scope.canDeletePet = result;
        });
        PetsApi.canCreatePet(function (result) {
            $scope.canCreatePet = result;
        });
        $scope.deletePet =  function(petId,petName) {
            if ($scope.canDeletePet === true) {
                if (confirm("You are trying to delete "+petName+" !!") == true) {
                    PetsApi.deletePet(function (result) {
                        if (result == true) {
                            $route.reload();
                        }else {
                            alert("Cannot do delete operation !!")
                        }
                    }, petId)
                }
            }else {
                alert("You are not authorized to do this operation !! ");
            }
            console.log("I will remove "+petId+":"+petName);
        };
    })

;
