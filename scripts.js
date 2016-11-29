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
	$.getJSON("https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=41a877bfa230ba6c56b60795c0403aa1", function(json) {
  	console.log(json);
  	$("#location").html(json.name);
    $("#temp").html(json.main.temp);  // figure out how to set parameters for F and C
    $("#description").html(json.weather[0].description);
  });
});
    
});

// latitude 44.741194899999996
// longitude -92.8635487
// https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=44.741194899999996&lon=-92.8635487&APPID=41a877bfa230ba6c56b60795c0403aa1
