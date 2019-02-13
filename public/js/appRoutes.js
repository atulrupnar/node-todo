angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', 'ngToastProvider', function(
	$routeProvider, $locationProvider, ngToast, ngToastProvider) {

    ngToast.configure({
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      maxNumber: 4,
      combineDuplications: true,
      newestOnTop: true,
      animation: 'fade'
    });

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/register', {
			templateUrl: 'views/signup.html',
			controller: 'SignUpController'
		})

		// .when('/forgot-password',{
		// 	templateUrl: 'views/forgot-password.html',
		// 	controller: ''
		// })

		.when('/dashboard', {
			templateUrl: 'views/task-dashboard.html',
			controller: 'DashboardController'
		})

		.otherwise({
			templateUrl: 'views/home.html',
			controller: 'MainController'
		});
	$locationProvider.html5Mode(true);

}]);