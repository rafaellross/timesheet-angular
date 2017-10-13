
var app = angular.module('myApp', ['ngRoute']).factory('beforeUnload', function ($rootScope, $window) {
    // Events are broadcast outside the Scope Lifecycle
    
    $window.onbeforeunload = function (e) {
        var confirmation = {};
        var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
        if (event.defaultPrevented) {
            return confirmation.message;
        }
    };
    
    $window.onunload = function () {
        $rootScope.$broadcast('onUnload');
    };
    return {};
})
.run(function (beforeUnload) {
    // Must invoke the service at least once
});



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


app.controller('SelectEmployeeController', ['$scope', '$http', 'EmployeesService', '$location' , function($scope, $http, EmployeesService, $location) {
  
  
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
    $scope.Sunday = UtilitiesService.WeekDays[0];
    $scope.getEndHours = function(startHour){        
        return UtilitiesService.SelectHours(startHour);
    };        
    $scope.duration = function(startHour, endHour){ 
      return UtilitiesService.calculateHours(startHour, endHour);      
    };
    
    $scope.containsObject = function(obj, list, property = "id"){
        return UtilitiesService.containsObject(obj, list, property)
    };
    $scope.Duration = "00:00"        ;
    $scope.calculateTotal = function(day){
        $scope.WeekDays[day.Number].duration = day.duration;
        var totalMin = 0; 
        angular.forEach( $scope.WeekDays, function(key, val) {            
            if (key.duration !== null) {
                totalMin += UtilitiesService.hourToMinutes(key.duration);
            }
        });
        $scope.Duration = UtilitiesService.minutesToHour(totalMin);
        console.log($scope.WeekDays);
    };
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
  
   this.containsObject = function(obj, list, property = "id") {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i][property] === obj[property]) {
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

    this.hourToMinutes = function(hour = '00:00'){
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
    
    this.SelectHours = function(start = '00:00'){
            var optionsHour = [];
        if (start === '00:00') {
            for (var hour = 0; hour <= (24*60)-15; hour += 15) {        
                optionsHour.push(this.addMinutes(start, hour));               
            }                                                      
        }else {
            hour = 0;
            while (hour <= (24*60)-15) {                
                optionsHour.push(this.addMinutes(start, hour));               
                hour += 15;
                if (this.addMinutes(start, hour) === "00:00") {
                    break;
                }    
            }            
        }
            
            return optionsHour;            
    };
    
    this.WeekDays = [
        {
           "Number" : 0,
           "Description" : "Sunday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : [],
           "startSelected" : false,
           "duration" : null
        },
        {
           "Number" : 1,
           "Description" : "Monday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : [],
           "startSelected" : false,
           "duration" : null
        },
        {
           "Number" : 2,
           "Description" : "Tuesday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : [],
           "startSelected" : false,
           "duration" : null
        },
        {
           "Number" : 3,
           "Description" : "Wednesday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : [],
           "startSelected" : false,
           "duration" : null
        },
        {
           "Number" : 4,
           "Description" : "Thursday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : [],
           "startSelected" : false,
           "duration" : null
        },
        {
           "Number" : 5,
           "Description" : "Friday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : [],
           "startSelected" : false,
           "duration" : null
        },
        {
           "Number" : 6,
           "Description" : "Saturday",
           "OptionHoursStart" : this.SelectHours(),
           "OptionHoursEnd" : [],
           "startSelected" : false,
           "duration" : null
        }
    ];
    
});

