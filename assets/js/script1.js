
var weatherApiKey = "e90149d5df606728396540fdb296f657";
var cityInput = document.getElementById('city-name');
var searchBtn = document.getElementById('search-btn');
var clearBtn = document.getElementById('clear-btn');
var searchHistory = [];


function citySearch(citySearch) {
    
    
    var searchInput = citySearch;
    searchHistory.unshift(searchInput);
    localStorage.setItem("city name", JSON.stringify(searchHistory));


    fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&limit=1&units=imperial&appid=" + weatherApiKey)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            
            //city name
            var cityName = document.getElementById('city-input');
            cityName.textContent = data.name;
            
            //date 
            var currentDate = moment().format("MM/DD/YYYY");
            var currentDateEl = document.getElementById('date');
            currentDateEl.textContent = "("+currentDate+")";
            
            //temp
            var cityTemp = document.getElementById("city-temp");
            cityTemp.textContent = Math.round(data.main.temp) + "\u00B0F ";
            
            //wind speed
            var windSpeed = document.getElementById("windspeed");
            windSpeed.textContent = Math.round(data.wind.speed) + " mph";
            
            //humidity
            var humidity = document.getElementById("humidity");
            humidity.textContent = data.main.humidity + "%";
        

            //latitude and longitude
            const lat = data.coord.lat;
            const lon = data.coord.lon;

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=" + weatherApiKey)
            .then(function(response) {
                return response.json();
            }).then(function (data) {
                
                //uv index
                var cityUvEl = document.getElementById("uv-index");
                var cityUv = data.current.uvi;
                cityUvEl.textContent = cityUv;
                if (cityUv <= 4) {
                    cityUvEl.setAttribute("class", "favorable");
                } else if (cityUv >= 7) {
                    cityUvEl.setAttribute("class", "severe");
                } else {
                    cityUvEl.setAttribute("class", "moderate");
                }
                
                
                //weather icon
                var dd = data.daily;
                const icon = dd[0].weather[0].icon;
                var img =  document.getElementById('icon-img');
                img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`


                
                
                //5 day forecast
                for (var i=1; i < 6; i++) {
                    console.log(dd[i]);
                    var dayCard = document.getElementById(`day${i}`);
                    var datedd = moment()
                    .add(i, "days")
                    .format("MM/DD/YYYY");
                    var dateddEl = document.createElement('datedd');
                    dateddEl.textContent = datedd;
                    var tempdd = Math.round(dd[i].temp.day);
                    var tempddEl = document.createElement('p');
                    tempddEl.textContent = "Temp: " + tempdd + "\u00B0F";
                    var wsdd = Math.round(dd[i].wind_speed);
                    var wsddEl = document.createElement('p');
                    wsddEl.textContent = "Wind: " + wsdd + " mph";
                    var humiditydd = dd[i].humidity;
                    var humidityddEl = document.createElement('p');
                    humidityddEl.textContent = "Humidity: " + humiditydd + "%";
                    var icondd = dd[i].weather[0].icon;
                    var iconddEl = document.createElement('p');
                    iconddEl.textContent = icondd;
                    var img = document.createElement("img");
                    img.src = `https://openweathermap.org/img/wn/${icondd}@2x.png`
                    var lineBreak = document.createElement('p');
                    lineBreak.textContent = " ";
                    dayCard.append(dateddEl, img, tempddEl, wsddEl, humidityddEl, lineBreak);


                }

            })
        });
}





searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var city = cityInput.value;
    if (city === "") {
        return;
    } else {
        citySearch(city);
    }
});


function clearStorage() {
    localStorage.clear();
    window.location.reload();
  }




// document.addEventListener("DOMContentLoaded", function () {
//         if (localStorage.getItem("city name")) {
//             searchHistory = localStorage.getItem(
//               "city name",
//               JSON.stringify(searchHistory)
//             );
//             searchHistory = JSON.parse(searchHistory);
//             //console.log(typeof(searchHistory));
//           }
    
//   });


function renderCities(){
    $("#city-list").empty();
    $("#city-name").val("");
    
    for (i=0; i<cityList.length; i++){
        var a = $("<a>");
        a.addClass("list-group-item list-group-item-action list-group-item-primary city");
        a.attr("data-name", cityList[i]);
        a.text(cityList[i]);
        $("#city-list").prepend(a);
    } 
}

function runCityList() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    
    if (storedCities !== null) {
        cityList = storedCities;
    }
    
    renderCities();
    }
