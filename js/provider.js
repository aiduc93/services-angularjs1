var app = angular.module('app', ['ngResource']);

// The provider
app.provider('angularjsIssue', function () {

    this.connection = '';
    
    this.$get = function($resource) {
        this.resource = $resource(this.connection);    
        // issue List
        this.resource.getIssueList = function () {
            return this.query()
        };
        
        // issue by ID
        this.resource.getIssue = function (number) {
            return this.get({ number: number})
        };
        return this.resource;        
    };

    this.setConnection = function(connection){
       this.connection = connection;
   };

});

// configuration
app.config(function(angularjsIssueProvider){
   angularjsIssueProvider.setConnection('https://api.github.com/repos/angular/angular.js/issues');
});

// controller
app.controller('mainCtrl', function($scope, angularjsIssue){ 
    $scope.myData= [];
    
    $scope.getIssuesList = function () {
        $scope.myData = angularjsIssue.getIssueList();
    };
    
    $scope.setCurrentIssue = function (number) {
        angularjsIssue.getIssue({
            number: number
        }, function (data) {
            $scope.myData = data;
        });
    };
    
    $scope.getIssuesList();
});