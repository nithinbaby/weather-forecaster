app.service('OpenWeatherMapService', function($http, $q, AppConstants){
    var apiKey = AppConstants.OPEN_WEATHER_MAP_API_KEY;
    this.getWeatherForecastByCityId = function(cityId) {
        var deferred = $q.defer();
        var url = AppConstants.WEATHER_API_BASE_URL + "?APPID=" + apiKey+ "&id=" + cityId;
        $http.get(url).then(function(result){
          deferred.resolve(result);
        }, function(error){
          deferred.reject(error);
        });
        return deferred.promise;
    };
});

app.service('WeatherQualityAlgorithm', function(){
    this.getWeatherQualityIndex = function(locationData) {                             
      var idealTemperature = 290;//in Kelvin
      var tempPlusMinusVariationExpedcted = 40;
      var temperatureSum = 0;
      
      var idealHumidity = 45;// in Percentage
      var humiditySum = 0;
      
      var idealWindSpeed = 5;// in m/s
      var windVariationExpected = 50;
      var windSum = 0;
      
      var idealPressure = 1016;//in hPa
      var pressureVariationExpected = 50
      var pressureSum = 0;
      
      var numberOfSamples = locationData.list.length;
      
      angular.forEach(locationData.list, function(sample){
        temperatureSum += sample.main.temp;
        humiditySum += sample.main.humidity;
        windSum += sample.wind.speed;
        pressureSum += sample.main.pressure;
      });
      
      var avgTemperature = temperatureSum/numberOfSamples;
      var avgHumidity = humiditySum/numberOfSamples;
      var avgWind = windSum/numberOfSamples;
      var avgPressure = pressureSum/numberOfSamples;
      
      var tempVarience = Math.abs(avgTemperature - idealTemperature);
      var tempQualityIndex = tempVarience > tempPlusMinusVariationExpedcted ? 0 : (100 - (tempVarience)/(tempPlusMinusVariationExpedcted)*100);
      console.log('tempQualityIndex', tempQualityIndex);
      
      var humidityQualityIndex =100 - (Math.abs(avgHumidity - idealHumidity))/(100 - idealHumidity)*100;
      console.log('humidityQualityIndex', humidityQualityIndex);
      
      var windVarience = Math.abs(avgWind - idealWindSpeed);
      var windQualityIndex = windVarience > windVariationExpected ? 0 : (100 - (windVarience)/(windVariationExpected)*100);
      console.log('windQualityIndex', windQualityIndex);
      
      var presssureVarience = Math.abs(avgPressure - idealPressure);
      var pressureQualityIndex = presssureVarience > pressureVariationExpected ? 0 : (100 - (windVarience)/(pressureVariationExpected)*100);
      console.log('pressureQualityIndex', pressureQualityIndex);
      
      const overallWeatherQualityIndex = (tempQualityIndex + humidityQualityIndex + windQualityIndex + pressureQualityIndex)/4;
      return overallWeatherQualityIndex.toFixed(2);;
    };
});
