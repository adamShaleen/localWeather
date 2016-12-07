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
	$.getJSON("http://api.apixu.com/v1/current.json?key=4f7878f8d5bd48de89430958160712&q=" + latitude + "," + longitude, function(json) {
    console.log(json);
    $("#location").html(json.location.name + ", " + json.location.region);
    $("#temp").html(json.current.temp_f + " F");
    $("#description").html(json.current.condition.text);
  });
});

});
