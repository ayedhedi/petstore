/**
 * Created by ayed.h on 17/02/2016.
 */

loginMod

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
