angular.module('LoginCtrl', []).controller('LoginController',['$scope', '$rootScope', '$http', 
			'$location', 'GetPost',  function($scope, $rootScope, $http, $location, GetPost) {


	$scope.login = function() {
		console.log('inside login');
		var data = {
			email : $scope.input.email,
			password : $scope.input.password,
			url : '/login'
		}
		GetPost.post(data, function(err, docs) {
				console.log(docs);
				$rootScope.userType = docs.data.userType;
				$location.path('/dashboard');
        });
	}
	$scope.isShowPassword = false;
	$scope.showHideText = 'SHOW';
	$scope.showHideType = 'password';
	$scope.togglePasswordField = function() {
		$scope.isShowPassword = !$scope.isShowPassword;
		$scope.showHideText = !$scope.isShowPassword ? 'SHOW' : 'HIDE';			
		$scope.showHideType = !$scope.isShowPassword ? 'password' : 'text';
	}

}]);