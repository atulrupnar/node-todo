angular.module('DashboardCtrl', []).controller('DashboardController',['$scope', '$rootScope',
 '$http', '$location', 'GetPost',  function($scope, $rootScope,  
 	$http, $location, GetPost) {

	GetPost.get({url : '/getTaskList'}, function(err, data) {
		console.log('tasks', data);
		$scope.tasks = data.data;
    });

    $scope.input = {};

	$scope.tasks = {};
    $scope.addTask = function (input, type) {
    	var data = {
			task : $scope.taskName,
			url : '/addTask'
		}
		console.log("addTask");
		GetPost.post(data, function(err, docs) {
			$location.path('/create-invoice');
	    });
    };
	
}]);