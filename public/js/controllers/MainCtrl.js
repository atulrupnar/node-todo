angular.module('MainCtrl', []).controller('MainController',['$scope', '$rootScope',
 '$http', '$location', 'GetPost', 'ngToast',  function($scope, $rootScope,  
 	$http, $location, GetPost, ngToast) {

	$scope.isLoggedIn = false;
	$scope.gotoDashboard = function() {
		$location.path('/dashboard');
	};

	if ($scope.isLoggedIn) {
		$scope.gotoDashboard();
	}

	var validate = function() {
		//required fields
		if (!$scope.input.email || !$scope.input.password) {
		 	GetPost.showAlert('Please fill required fields', 'danger');
			return false;
		}
		if (!GetPost.isEmail($scope.input.email)) {
			GetPost.showAlert('Invalid Email', 'danger');
			return false;
		}
		return true;
	}

	$scope.startApp = function() {
		GetPost.get({url : '/isLoggedIn'}, function(err, resp) {
			if (resp.status) {
				$rootScope.user = resp.data;
				console.log(resp.data)
				$location.path('/dashboard');
			}
        });
	};

	$scope.startApp();

	$scope.login = function() {
		if (!validate()) {
			return;
		}
		var data = {
			email : $scope.input.email,
			password : $scope.input.password,
			url : '/login'
		}
		GetPost.post(data, function(err, resp) {
			$scope.isLoggedIn = true;
			if (!resp.status) {
				GetPost.showAlert(resp.error.msg, 'danger');
				$scope.input = {};
				return;
			} else {
				GetPost.showAlert('You are successfully logged in', 'success');
				$rootScope.user = resp.data;
				$location.path('/dashboard');
			}

        });
	}
}]);