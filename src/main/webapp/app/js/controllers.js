/**
 * Created by ayed.h on 12/02/2016.
 */

petStoreApp

    .controller('ViewLoginCtrl', function($scope, $rootScope, $location, AuthenticationService) {
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
    })

    .controller('PetsCtrl', function($scope,$route, PetsService, OpsChecksService) {
        $scope.pets = null;
        PetsService.getAllPets(function(dataResponse) {
            $scope.pets = dataResponse;
        });
        OpsChecksService.canDeletePet(function (result) {
            $scope.canDeletePet = result;
        });
        OpsChecksService.canCreatePet(function (result) {
            $scope.canCreatePet = result;
        });
        $scope.deletePet =  function(petId,petName) {
            if ($scope.canDeletePet === true) {
                if (confirm("You are trying to delete "+petName+" !!") == true) {
                    PetsService.deletePet(function (result) {
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
        $scope.filterAvailability =  function(pet) {
            if(!$scope.queryAvailable || pet.status=='AVAILABLE'){
                return pet;
            }
        };
    })


    .controller('PetDetailsCtrl', function($scope, $routeParams, PetsService) {
        PetsService.getPetDetails(function(dataResponse) {
            console.log(dataResponse);
            $scope.pet = dataResponse;
        }, $routeParams.petId);
    })

    .controller('CreatePetCtrl', function($scope,$http,$rootScope,$location, PetsService) {
        $scope.image = null;
        $scope.newPet = {};
        $scope.newPet.category = {};
        $scope.newPet.tags = [];
        $scope.newPet.tags.push({key:"", value:""});
        $scope.newPet.name = "No Name";
        $scope.newPet.category.name = "Dog";
        $scope.newPet.status = "AVAILABLE";


        $scope.createPet = function() {
            var fd;
            //save the image if any !!
            if ($scope.image!=null) {                                                       // ------> With Image
                fd = new FormData();
                //Take the first selected file
                fd.append("file", $scope.image[0]);
                fd.append("name", $scope.newPet.name);
                var promise = function(){
                    var deferred = angular.injector(['ng']).get('$q').defer();
                    $http({
                        method: 'POST',
                        data: fd,
                        url: url_base+'/pet/image/upload',
                        headers: {'Authorization': $rootScope.authdata, 'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function(result){
                        $scope.newPet.imageUrl=null;
                        $scope.newPet.imageUrl=result.imageUrl;
                        deferred.resolve();
                    }).error(function(){
                        console.log('Error');
                    });
                    return deferred.promise;
                };
                promise().then(function () {
                    PetsService.createNewPet(function () {
                        $location.path('/pets');
                    }, $scope.newPet);
                })
            }else {
                $scope.newPet.imageUrl="img/__nopicture__.png";
                PetsService.createNewPet(function () {
                    $location.path('/pets');
                }, $scope.newPet);
            }
        };
        $scope.checkTags = function () {
            return $scope.newPet.tags.filter(function (tag) {
                    return tag.key=='' || tag.value=='';
                }).length > 1;
        };
        $scope.updateNewPet = function() {
            var length = $scope.newPet.tags.length;
            var tags = $scope.newPet.tags;
            if (tags[length-1].value != '' || tags[length-1].key != '') {
                tags.push({key:"", value:""});
            }
            if (length>1 &&
                tags[length-2].value == '' && tags[length-2].key == '' &&
                tags[length-1].value == '' && tags[length-1].key == '') {
                tags.pop();
            }
        };
        $scope.uploadFile = function(files) {
            $scope.image = files;
            console.log(files);
        };
    })

;
