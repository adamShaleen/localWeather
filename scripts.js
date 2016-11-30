$(document).ready(function() {
var latitude = "";
var longitude = "";
// get location and assign values to lat/lon variables
	navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude, longitude);
  });

$("#getWeather").click(function() {
	$.getJSON("https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=41a877bfa230ba6c56b60795c0403aa1&units=imperial", function(json) {
  	$("#location").html(json.name);
    $("#temp").html(Math.round(json.main.temp));
    $("#description").html(json.weather[0].description);
    console.log(json.name, json.main.temp, json.weather[0].description);
  });
});

});

// Hastings latitude 44.741194899999996 longitude -92.8635487
