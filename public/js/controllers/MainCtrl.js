angular.module('MainCtrl', []).controller('MainController',['$scope', '$rootScope',
 '$http', '$location', 'GetPost',  function($scope, $rootScope,  
 	$http, $location, GetPost) {

	$scope.isLoggedIn = false;
	$scope.gotoDashboard = function() {
			$location.path('/dashboard');		
	};

	if ($scope.isLoggedIn) {
		$scope.gotoDashboard();
	}
	$scope.login = function() {
		var data = {
			email : $scope.input.email,
			password : $scope.input.password,
			url : '/login'
		}
		GetPost.post(data, function(err, docs) {
			$location.path('/dashboard');
			$scope.isLoggedIn = true;
        });
	}

}]);