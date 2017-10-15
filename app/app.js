var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);


app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'pages/home.html',
    controller  : 'HomeController'
  })

  .when('/select', {
    templateUrl : 'pages/select-employee.html',
    controller  : 'SelectEmployeeController'
  })
  
  .when('/new', {
    templateUrl : 'pages/new.html',
    controller  : 'NewTimeSheetController'
  })

  .when('/manage', {
    templateUrl : 'pages/manage.html',
    controller  : 'ManageController'
  })

  .when('/save', {
    templateUrl : 'pages/save.html',
    controller  : 'SaveController'
  })

  .otherwise({redirectTo: '/'});
});





