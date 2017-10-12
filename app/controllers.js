var app = angular.module('myApp', ['ngRoute']);

app.controller('HomeController', ['$scope', function($scope) {
        $scope.message = 'Hello from HomeController';
}]);

app.controller('BlogController', ['$scope', function($scope) {
        $scope.message = 'Hello from BlogController';
}]);


app.controller('AboutController', ['$scope', function($scope) {
        $scope.message = 'Hello from AboutController';
}]);