angular.module('myApp').controller('HomeController', ['$scope', function($scope) {
     
}]);

angular.module('myApp').controller('SelectEmployeeController', ['$scope', '$http', 'EmployeesService', '$location', '$mdDialog' , function($scope, $http, EmployeesService, $location, $mdDialog) {
  
$scope.showAddRemove = function(employee, type) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to ' + type.toLowerCase() + ' ' + employee.name + ' ?')
          //.textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')          
          .ok(type)
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
        if (type === 'Add') {
            $scope.select(employee);
        }else {
            $scope.remove(employee);                                        
        }

      
    }, function() {
      
    });
  };
 
 $scope.selecteds = EmployeesService.List;
 $scope.showEmployees = function(name = ""){
    $http({
           method : "GET",
           url : "backend/list-employees.php?name=" + name
       }).then(function (response) {               
           $scope.employees = [];           
            angular.forEach( response.data, function(key, val) {            
                if (!EmployeesService.containsObject(key, $scope.selecteds)) {
                    $scope.employees.push(key);
                }                
            });                                  
       });              
 };

 $scope.select = function(employee){      
    var itemIndex = EmployeesService.findObjIndex($scope.employees, "id", employee.id);
    $scope.employees.splice(itemIndex, 1);               
    EmployeesService.add(employee);
    $scope.selecteds = EmployeesService.List;
 };
 
 $scope.remove = function(employee){
    EmployeesService.remove(employee);
 };

}]);

angular.module('myApp').controller('NewTimeSheetController', ['$scope', 'EmployeesService', 'UtilitiesService', '$mdDialog', function($scope, EmployeesService, UtilitiesService, $mdDialog) {    
    $scope.remove = function(employee){
        EmployeesService.remove(employee);
     };
        
    $scope.showAddRemove = function(employee, type) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Would you like to ' + type.toLowerCase() + ' ' + employee.name + ' ?')
              //.textContent('All of the banks have agreed to forgive you your debts.')
              .ariaLabel('Lucky day')          
              .ok(type)
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            if (type === 'Add') {
                $scope.select(employee);
                EmployeesService.List = $scope.selecteds;
            }else {
                $scope.remove(employee);                                        
            }


        }, function() {

        });
      };
        
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
        //console.log($scope.WeekDays);
    };
}]);


angular.module('myApp').controller('ManageController', ['$scope', '$mdToast', function($scope, $mdToast) {
    $scope.showSimpleToast = function(Message="no message!") {
      var pinTo = "bottom center";

      $mdToast.show(
        $mdToast.simple()
          .textContent(Message)
          .position(pinTo )
          .hideDelay(3000)
      );
    };
     $scope.showSimpleToast("Timesheets saved with success!");
}]);

angular.module('myApp').controller('SaveController', ['$scope', 'EmployeesService','$location', '$timeout', function($scope, EmployeesService, $location, $timeout) {
    $timeout(function() {
        $location.path('/manage');
    }, 3000);
          
    $scope.timesheet = EmployeesService.TimeSheet;
    $scope.timesheet.Employees = EmployeesService.List;
    $scope.save = function(){

    };
}]);