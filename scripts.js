$(document).ready(function() {

// background images
var sunny = "/img/sunny.jpg";
var cloudy = "/img/cloudy.jpg";
var snow = "/img/snow.jpg";
var rain = "/img/rain.jpg";

// hide temp toggle buttons on page load
$("#changeToCelsius").hide();
$("#changeToFahrenheit").hide();

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
                $("#location").html(json.location.name + ", " + json.location.region);
                $("#temp").html(json.current.temp_f + " °F");
                $("#description").html(json.current.condition.text);
				$("#icon").attr("src", json.current.condition.icon);
				$("#changeToCelsius").show();

				// assign condition to variable to check with include function
				var condition = json.current.condition.text;

				// background conditional statements
				if (condition.includes("Cloudy") || condition.includes("Overcast")) {
					$("body").css("background" , 'url("' + cloudy + '")');
				} else if(condition.includes("snow") || condition.includes("Snow")) {
					$("body").css("background", 'url("' + snow + '")');
				} else if(condition.includes("Sun") || conition.includes("Sunny") || condition.includes("sun")) {
					$("body").css("background", 'url("' + sunny + '")');
				} else if(condition.includes("Rain") || condition.includes("Raining") || condition.includes("rain")) {
					$("body").css("background", 'url("' + rain + '")');
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
