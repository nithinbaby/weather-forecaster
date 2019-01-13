app.controller('WeatherController', function($scope, $interval, OpenWeatherMapService, WeatherQualityAlgorithm) {
  $scope.title = "Weather Forecast";
  $scope.weatherList = [{
    city: "Amsterdam",
    forecast: null,
    cityId: 2759794
  },{
    city: "Moscow",
    forecast: null,
    cityId: 524901
  },{
    city: "New York",
    forecast: null,
    cityId: 5128638
  }];
  $scope.timers = [];
  $scope.findForecastedValue = function(tabId) {
    OpenWeatherMapService.getWeatherForecastByCityId($scope.weatherList[tabId].cityId).then(function(result){
      $scope.weatherList[tabId].forecast = WeatherQualityAlgorithm.getWeatherQualityIndex(result.data);
      $scope.isLoading = false;
    }), function(error){
      console.error("Error loading data: ", error);
    }
  },
  $scope.tabClick = function(tabId){  
    if(!$scope.timers[tabId]){
      $scope.findForecastedValue(tabId);
      $scope.timers[tabId] = $interval(function(){
        $scope.findForecastedValue(tabId);
      }, 1000*60*10);
    }
  };
  $scope.init = function(){
    $scope.tabClick(0);
  };
  $scope.init();
});
