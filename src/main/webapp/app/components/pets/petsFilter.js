/**
 * Created by ayed.h on 17/02/2016.
 */

petsMod
    .filter('availablePet', function() {
        return function (pets, checked) {
            if (!checked) {
                return pets;
            }
            var valid = [];
            angular.forEach(pets, function (pet) {
                if (pet.status == 'AVAILABLE') {
                    valid.push(pet);
                }
            });
            return valid;
        }
    })

    .filter('availableFilterIcon', function() {
        return function(isAvailable) {
            return (isAvailable == "AVAILABLE") ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove";
        };
    })

    .filter('availableFilterClass', function() {
        return function(isAvailable) {
            return (isAvailable == "AVAILABLE") ? "success" : "danger";
        };
    })

;