app.directive('weatherIndicator', function(AppConstants, $timeout) {
  return {
    scope:{
      forecastValue:"="
    },
    replace:true,    
    templateUrl:"./partials/weather-indicator.htm"
  }
});
