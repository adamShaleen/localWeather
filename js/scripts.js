$(document).ready(function() {

// background images
var sunny = "style/img/sunny.jpg";
var cloudy = "style/img/cloudy.jpg";
var snow = "style/img/snow.jpg";
var rain = "style/img/rain.jpg";
var clear = "style/img/clear.jpg";
var fog = "style/img/fog.jpg";

// hide all content on load
$("#location").hide();
$("#temp").hide();
$("#humidity").hide();
$("#wind").hide();
$("#description").hide();
$("#description").hide();
$("#icon").hide();
$("#changeToCelsius").hide();
$("#changeToFahrenheit").hide();
$("#by").hide();

// empty placeholders for users coordinates and temp
var latitude = "";
var longitude = "";

    // get location and assign values to lat/lon variables
	navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // when the API promise is returned, hide the loading status and populate the data to respective HTML elements
    $("body").promise().done(function() {

        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://api.apixu.com/v1/current.json?key=4f7878f8d5bd48de89430958160712&q=" + latitude + "," + longitude,
            success: function(json) {
				$("#loading").hide();
                $("#loader").hide();
                $("#location").html(json.location.name + ", " + json.location.region).fadeIn();
                $("#temp").html(json.current.temp_f + " °F").fadeIn();
				$("#humidity").html("Humidity " + json.current.humidity + "%").fadeIn();
				$("#wind").html("Wind " + json.current.wind_mph + " mph from " + json.current.wind_dir).fadeIn();
                $("#description").html(json.current.condition.text).fadeIn();
				$("#icon").attr("src", json.current.condition.icon).fadeIn();
				$("#changeToCelsius").fadeIn();
				$("#by").fadeIn();

				// assign condition to variable to check with .include() function
				var condition = json.current.condition.text;

				// background conditional statements
				if (condition.includes("Cloudy") || condition.includes("Overcast") || condition.includes("cloudy")) {
					$("body").css("background" , 'url("' + cloudy + '")');
				} else if(condition.includes("snow") || condition.includes("Snow")) {
					$("body").css("background", 'url("' + snow + '")');
				} else if(condition.includes("Sun") || condition.includes("Sunny") || condition.includes("sun")) {
					$("body").css("background", 'url("' + sunny + '")');
				} else if(condition.includes("Rain") || condition.includes("Raining") || condition.includes("rain")) {
					$("body").css("background", 'url("' + rain + '")');
				} else if(condition.includes("Clear") || condition.includes("clear")) {
					$("body").css("background", 'url("' + clear + '")');
				} else if(condition.includes("Fog") || condition.includes("fog")) {
					$("body").css("background", 'url("' + fog + '")');
				}

				// change temp to celsius and swap toggle button
				$("#changeToCelsius").on("click", function() {
		 		   $("#temp").html(json.current.temp_c + " °C");
		 		   $("#changeToCelsius").hide();
				   $("#changeToFahrenheit").show();
		 	   });

			   // change temp to fahrenheit and swap toggle button
			   $("#changeToFahrenheit").on("click", function() {
				   $("#temp").html(json.current.temp_f + " °F");
				   $("#changeToCelsius").show();
				   $("#changeToFahrenheit").hide();
			   });

            }
        });

    });

   });

});
