
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

app.controller('NewTimeSheetController', ['$scope', 'EmployeesService', 'UtilitiesService', function($scope, EmployeesService, UtilitiesService) {    
    $scope.selecteds = EmployeesService.List;
    $scope.WeekDays = UtilitiesService.WeekDays;
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

app.service('UtilitiesService', function(){
   this.addMinutes = function(time, minsToAdd) {
        function D(J){ 
            return (J<10? '0':'') + J;
        };
        var piece = time.split(':');
        var mins = piece[0]*60 + +piece[1] + +minsToAdd;
        return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
    };
    
    this.calculateHours = function(startHour, endHour) {
           function D(J){ 
               return (J<10? '0':'') + J;
           };
           var startPiece = startHour.split(':');
           var startMins = startPiece[0]*60 + +startPiece[1];

           var endPiece = endHour.split(':');
           var endMins = endPiece[0]*60 + +endPiece[1];

           var totalMins = endMins - startMins;

           return D(totalMins%(24*60)/60 | 0) + ':' + D(totalMins%60);  
      };

    this.hourToMinutes = function(hour){
        var piece = hour.split(':');
         var mins = piece[0]*60 + +piece[1];
         return mins;
    };

    this.minutesToHour = function(minutes){
         function D(J){ 
             return (J<10? '0':'') + J;
         };
         return D(minutes/60 | 0) + ':' + D(minutes%60);  
    };
    
    this.SelectHours = function(){
            var optionsHour = [];
            for (var hour = 0; hour <= (24*60)-15; hour += 15) {        
                optionsHour.push(this.addMinutes('00:00', hour));               
            }                                          
            return optionsHour;            
    };
    
    this.WeekDays = [
        {
           "Number" : 0,
           "Description" : "Sunday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : []
        },
        {
           "Number" : 1,
           "Description" : "Monday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : []
        },
        {
           "Number" : 2,
           "Description" : "Tuesday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : []
        },
        {
           "Number" : 3,
           "Description" : "Wednesday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : []
        },
        {
           "Number" : 4,
           "Description" : "Thursday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : []
        },
        {
           "Number" : 5,
           "Description" : "Friday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : []
        },
        {
           "Number" : 6,
           "Description" : "Saturday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : []
        }
    ];
    
});

