angular.module('GetPostService', []).factory('GetPost', ['$http', '$rootScope', 'ngToast', function($http, $rootScope, ngToast) {

        /* Post data */
        var post  = function(input, cb) {
            // var url = getUrl(input);
            console.log('GetPostService > post(): input = ',input);
            $rootScope.isMainLoader = true;
            $http.post(input.url, input)
            .then(function(resp) {
                $rootScope.isMainLoader = false;
                // console.log('inside getpost post')
                /* Success */
                console.log('GetPostService > post(): resp = ',resp);
                if (resp.data && resp.data.status) {
                    return cb(0, resp.data);
                }
                return cb(1, resp.data);
            }, function(resp) {
                /* Failure */
                $rootScope.isMainLoader = false;
                console.log("post: Error received for ");
                console.log(resp.data);
                return cb(1, resp.data);
            });
        };

        var get = function(input, cb) {
            var url = input.url;
            $rootScope.isMainLoader = true;
            $rootScope.isLoggedIn = false;
            $http.get(url)
            .then(function(resp) {
                $rootScope.isMainLoader = false;
                $rootScope.isLoggedIn = true;
                if (!(resp.data && resp.data.status)) {
                    console.log("get: could not get data to ");
                    return cb(1, resp.data);
                }
                return cb(0, resp.data);
            }, function(resp) {
                /* Failure */
                $rootScope.isMainLoader = false;
                console.log("get:   Error received for ");

                return cb(1, resp.data);
            });
        };

        var showAlert = function(msg, className='success') {
            console.log('inside showAlert');
            ngToast.create({
                className: className, // "success", "info", "warning" or "danger"
                horizontalPosition : 'center',
                verticalPosition : 'top',
                content: msg
            });
        };

        var isEmail = function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        var service = {
            post : post,
            get : get,
            showAlert : showAlert,
            isEmail : isEmail
        };

        return service;

}]);