var SignUpCtrl = angular.module('SignUpCtrl', []);
SignUpCtrl.controller('SignUpController',['$scope', '$rootScope',
 '$http', '$location', 'GetPost', 'ngToast',  function($scope, $rootScope,  
 	$http, $location, GetPost, ngToast) {

	$scope.isLoggedIn = false;
	$scope.input = {};

	var validate = function() {
		//required fields
		if (!$scope.input.firstName || !$scope.input.email || 
			!$scope.input.password) {
			GetPost.showAlert('Please fill required fields', 'danger');
			return false;
		}
		if (!GetPost.isEmail($scope.input.email)) {
			GetPost.showAlert('Invalid Email', 'danger');
			return false;
		}

		if ($scope.input.password != $scope.conifrmPassword) {
			GetPost.showAlert('Password Mismatch', 'danger');
			return false;
		}
		if (!$scope.isAgreed) {
			GetPost.showAlert('Please accept the term of use', 'danger');
			return false;
		}
		return true;
	}

	$scope.signup = function() {
		if (!validate()) {
			return;
		}
		var data  = {input : $scope.input, url : '/signup'};
		GetPost.post(data, function(err, resp) {
			console.log(err, resp);
			if (!resp.status) {
				GetPost.showAlert(resp.error.msg, 'danger');
				$scope.input = {};
			} else {
				GetPost.showAlert('Registration Successful', 'success');
				$location.path('/login');
			}
	    });
	}

	$scope.login = function() {
		window.location.href = "/login";
		// $location.path('/signup');		
	};
}]);