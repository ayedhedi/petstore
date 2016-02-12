/**
 * Created by ayed.h on 12/02/2016.
 */

petStoreApp

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
