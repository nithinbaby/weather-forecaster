var app = angular.module("myApp", ["ngRoute", "ngMaterial"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "partials/weather.htm",
        controller : "WeatherController"
    })

});

app.run(function($rootScope) {
  $rootScope.gm={

  }
});
