angular.module('DashboardCtrl', []).controller('DashboardController',['$scope', '$rootScope',
 '$http', '$location', 'GetPost', 'ngToast',  function($scope, $rootScope,  
 	$http, $location, GetPost, ngToast) {

    $scope.getTasks = function () {
		GetPost.get({url : '/getTaskList'}, function(err, data) {
			console.log('tasks', data);
			$scope.tasks = data.data;
	    });
    };

    $scope.getTasks();

	$scope.tasks = {};
    $scope.addTask = function () {
    	if (!$scope.taskName) {
			GetPost.showAlert('Task can not be empty', 'danger');
    		return;
    	}
    	var data = {
			task : $scope.taskName,
			url : '/addTask'
		}
		GetPost.post(data, function(err, resp) {
			//$location.path('/dashboard');
			$scope.taskName = '';
			if (!resp.status) {
				GetPost.showAlert(resp.error.msg, 'danger');
				return;
			}
			GetPost.showAlert('Task Added Successfully', 'success');
		    $scope.getTasks();
	    });
    };

    $scope.deleteTask = function (id) {
    	var data = {
			taskId : id,
			url : '/deleteTask'
		}
		GetPost.post(data, function(err, docs) {
		    $scope.getTasks();
	    });
    };

    $scope.updateTask = function (status) {
    	var r = status=='completed' ? true:false;
    	console.log('checked : ', r);
    	return r;
    }

    $scope.updateTask = function (id) {
    	if (t.status == 'completed') {
    		return;
    	}
    	var data = {
			taskId : id,
			url : '/updateTask'
		}
		GetPost.post(data, function(err, docs) {
		    $scope.getTasks();
	    });
    };

    $scope.filterType = 'active';
    $scope.filterTasks = function(task) {
    	if ($scope.filterType == 'all') {
    		return task.status == 'active' || task.status == 'completed';
    	}
    	return task.status == $scope.filterType;
    }

    $scope.updateFilter = function(type) {
    	$scope.filterType = type;
    };

	$scope.currentPage = 1
	$scope.numPerPage = 10
	$scope.maxSize = 5;

	$scope.numPages = function () {
		return 10;
	    //return Math.ceil($scope.todos.length / $scope.numPerPage);
	};

	  /*$scope.$watch('currentPage + numPerPage', function() {
	    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	    , end = begin + $scope.numPerPage;
	    
	    $scope.filteredTodos = $scope.todos.slice(begin, end);
	  });*/
	
}]);