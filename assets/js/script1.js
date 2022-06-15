
var weatherApiKey = "e90149d5df606728396540fdb296f657";
var cityInput = document.getElementById('city-name');
var searchBtn = document.getElementById('search-btn');



function citySearch(citySearch) {
    fetch ("http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&limit=1&units=imperial&appid=" + weatherApiKey)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            var div = document.createElement("div");
            var cityName = document.getElementById('city-input');
        
            cityName.textContent = data.name;
            var cityTemp = document.getElementById("city-temp");
            cityTemp.textContent = "Temp: " + Math.round(data.main.temp) + "\u00B0F ";
            var windSpeed = document.getElementById("windspeed");
            windSpeed.textContent = "Windspeed: " + Math.round(data.wind.speed) + " mph";
            var humidity = document.getElementById("humidity");
            humidity.textContent = "Humidity: " + data.main.humidity + "%";
            
            const lat = data.coord.lat;
            const lon = data.coord.lon;

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=" + weatherApiKey)
            .then(function(response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                console.log(data.current.uvi);
                var cityUvEl = document.getElementById("uv-index");
                var cityUv = data.current.uvi;
                cityUvEl.textContent = "UV Index: " + cityUv;
                if (cityUv <= 4) {
                    cityUvEl.setAttribute("class", "favorable");
                } else if (cityUv >= 7) {
                    cityUvEl.setAttribute("class", "severe");
                } else {
                    cityUvEl.setAttribute("class", "moderate");
                }
                var currentDate = data.current.dt;
                

                var dd = data.daily;
                const icon = dd[0].weather[0].icon;
                const iconLink = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                iconLink.imageContent = document.getElementById('city-input');
    
                //box for display 
                for (var i=0; i < 5; i++) {
                    console.log(dd[i]);
                    var tempdd = dd[i].temp.day;
                    var wsdd = dd[i].wind_speed;
                    var icondd = dd[i].weather[0].icon;

                    console.log(tempdd);
                    console.log(wsdd);
                    console.log(icondd);

                    tempdd.textContent = document.getElementById('day1');
                    // wsdd.textContent = document.getElementByClass('col-2');
                    // icondd.imgContent = document.getElementByClass('col-2');


                }

            })
        });
}





searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var city = cityInput.value;
    citySearch(city);
})


