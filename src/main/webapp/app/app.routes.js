/**
 * Created by ayed.h on 17/02/2016.
 */

petStoreApp

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'app/shared/login/loginView.html',
                controller: 'LoginCtrl'
            })
            .when('/pets', {
                templateUrl: 'app/components/pets/petsView.html',
                controller: 'PetsCtrl'
            })
            .when('/pet/:petId', {
                templateUrl: 'app/components/pet/petView.html',
                controller: 'PetCtrl'
            })
            .when('/addPet', {
                templateUrl: 'app/components/pet/petCreateView.html',
                controller: 'PetCreateCtrl'
            })
            .otherwise({redirectTo: '/login'});
    }])

;
