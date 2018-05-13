var app = angular.module('app', []);

//***init constant***
app.constant('movieConstant', 'The Matrix');

//Difference way
app.config(function ($provide) {
  $provide.constant('movieTitle', 'Fast and furious');
});


//***init value***
app.value('movieTitleValue', 'The Transformer');


//Difference way
//app.config(function ($provide) {
// $provide.value('movieTitle', 'Fast and furious');
//});


//***Service***
app.service('movie', function () {
  this.title = 'The Matrix';
});
 

//Difference way
app.config(function ($provide) {
  $provide.service('movie', function () {
    this.title = 'The Matrix';
  });
});

//***Factory***
app.factory('movie', function () {
  return {
    title: 'The Matrix'
  }
});
 
//Difference way
app.config(function ($provide) {
  $provide.factory('movie', function () {
    return {
      title: 'The Matrix'	
    }
  });
});

//***Provider***
app.provider('movie', function () {
  var version;
  return {
    setVersion: function (value) {
      version = value;
    },
    $get: function () {
      return {
          title: 'The Matrix' + ' ' + version
      }
    }
  }
});


//***Example provider vs Service vs Factory***
var myFunction = function() {
  this.name = "Duc";
  this.$get = function() {
    this.name = "Will"
    return "Hello from myFunction..$get(). this.name = " + this.name;
  };
  return "Hello from myFunction(foo, callback)(). this.name = " + this.name;
};

// returns the actual function
app.service( 'myService', myFunction );
// returns the function's return value
app.factory( 'myFactory', myFunction );
// returns the output of the function's $get function
app.provider( 'myProvider', myFunction );

app.controller('ctrl', function ( $scope,  movieConstant, movieTitle, movieTitleValue, movie, myService, myFactory, myProvider ) {
	$scope.movieTitle = movieTitle;
	$scope.movieTitleValue = movieTitleValue;
	$scope.movieConstant = movieConstant;
	$scope.movie = movie;
	$scope.serviceOutput = "myService = " + myService;
 	$scope.factoryOutput = "myFactory = " + myFactory;
 	$scope.providerOutput = "myProvider = " + myProvider;
});

//Example 2
app.provider('foo', function() {

  var private = "Private";

  return {

    setPrivate: function(newValue) {
      private = newValue;
    },

    $get: function() {
      function getPrivate() {
        return private;
      }

      return {
        variable: "This is public",
        getPrivate: getPrivate
      };
    }

  };

});

app.config(function(fooProvider) {
  fooProvider.setPrivate('New value from config');
});
app.controller('ctrl2', function ( $scope, foo) {
	$scope.foo = foo;
	
});

// Factory
app.factory('clientId', function clientIdFactory() {
  return '123456';
});

app.factory('token', ['clientId', function tokenFactory(clientId) {
  var encrypt = function(data1, data2) {
    // NSA-proof encryption algorithm:
    return (data1 + ':' + data2).toUpperCase();
  };

  var secret ='zx123zx12222';
  var token = encrypt(clientId, secret);

  return token;
}]);
app.controller('demoFactoryCtrl', function demoFactoryCtrl($scope, clientId, token) {
	$scope.clientId = clientId;
	$scope.token = token;
})

//Service
function UnicornLauncher(apiToken) {

  this.launchedCount = 0;
  this.launch = function() {
    this.launchedCount++;
  }
}
myApp.factory('unicornLauncher', ["apiToken", function(apiToken) {
  return new UnicornLauncher(apiToken);
}]);
myApp.service('unicornLauncher', ["apiToken", UnicornLauncher]);