/**
 * Created by ayed.h on 17/02/2016.
 */

petMod

    .controller('PetCreateCtrl', function($scope,$http,$rootScope,$location, PetsApi) {
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
                    PetsApi.createNewPet(function () {
                        $location.path('/pets');
                    }, $scope.newPet);
                })
            }else {
                $scope.newPet.imageUrl="img/__nopicture__.png";
                PetsApi.createNewPet(function () {
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