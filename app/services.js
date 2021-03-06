angular.module('myApp').service('EmployeesService', function() {
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
            if (key[property] === value) {                
                result = key;
            }            
        });
        return result;
    };     
    
});

angular.module('myApp').service('UtilitiesService', function(){
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

