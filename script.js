var lat, lon, temperatureCel, temperetureFer;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          getWeather(lat, lon);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function getWeather(lat, lon) {
    $.ajax({
        headers: {
            Accept: "application/json",
        },
        url: 'https://fcc-weather-api.freecodecamp.repl.co/api/current?lat=' + lat + '&lon=' + lon,
        success: function (generate) {
            // console.log("getWeather -> generate ", generate);
            $(".city").text(generate.name + ", ");
            $(".country").text(generate.sys.country); 
            $(".weather").text(generate.weather[0].main);
            $('#picture').attr('src', generate.weather[0].icon);

            temperatureCel = generate.main.temp + " °C";
            temperetureFer = (generate.main.temp * 9 / 5) + 32 + " F";

            $(".temperature").text(generate.main.temp + " °C");
            $(".humidity").text(generate.main.humidity + "%");
            $(".wind").text(generate.wind.speed + " mph");
        }
    });
}

$(document).ready(function () {
    var isCel = true;
    getLocation();
    $(".temperature").click(function () {
        if (isCel) {
            $("#change-temp").text(temperetureFer);
            isCel = false;
        } else {
            $("#change-temp").text(temperatureCel);
            isCel = true;
        }
    });
});