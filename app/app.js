
var app = angular.module('myApp', ['ngRoute']);

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
    controller  : 'AboutController'
  })

  .otherwise({redirectTo: '/'});
});

app.controller('HomeController', ['$scope', function($scope) {
     
}]);


app.controller('SelectEmployeeController', ['$scope', '$http', 'EmployeesService', function($scope, $http, EmployeesService) {
  
 $scope.selecteds = EmployeesService.List;
 $scope.showEmployees = function(name = ""){
    $http({
           method : "GET",
           url : "backend/list-employees.php?name=" + name
       }).then(function (response) {               
           $scope.employees = response.data;                   
       });              
 };

 $scope.select = function(employee){  
    EmployeesService.add(employee);
    $scope.selecteds = EmployeesService.List;
 };
 
 $scope.remove = function(employee){
    EmployeesService.remove(employee);
 };
 
}]);

app.controller('NewTimeSheetController', ['$scope', 'EmployeesService', function($scope, EmployeesService) {    
    $scope.selecteds = EmployeesService.List;
}]);


app.service('EmployeesService', function() {
  this.List = [];
  
  this.add = function (employee) {
    if (!this.containsObject(employee, this.List)) {
        this.List.push(employee);
    }
  };
  
  this.remove = function (employee) {
    var itemIndex = this.findObjIndex(this.List, "id", employee.id);
    this.List.splice(itemIndex, 1);          
  };
  
   this.containsObject = function(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return true;
        }
    }
        return false;
    };
    
    this.findObjIndex = function(arr, property, value){
        var result = -1;
        
        angular.forEach( arr, function(key, val) {
            if (val[property] === value) {                
                result = key;
            }            
        });
        return result;
    };       
});

