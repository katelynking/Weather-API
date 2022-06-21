
var weatherApiKey = "e90149d5df606728396540fdb296f657";
var cityInput = document.getElementById('city-name');
var searchBtn = document.getElementById('search-btn');
var xBtn = document.getElementById('x-btn');
var clearBtn = document.getElementById('clear-btn');
var currentCity;
var searchHistory = [];

cityBtns();

function reload() {
    document.location.reload();
}


function cityBtns() {

    document.addEventListener("DOMContentLoaded", function () {

        if (localStorage.getItem("city name")) {
            searchHistory = localStorage.getItem(
                "city name",
                JSON.stringify(searchHistory)
            );
            searchHistory = JSON.parse(searchHistory);
            

            const searchEl = $('#search-history').empty();
            for (i = 0; i < searchHistory.length; i++) {
                const btn = $("<button>");
                const btns = {
                    class: btn.addClass("list-group-item list-group-item-action  search-history-btn"),
                    attr: btn.attr("id", searchHistory[i]),
                    text: btn.text(searchHistory[i]),
                }
                searchEl.prepend(btn);

                const city = btns.text[0].innerHTML;

                $(btn).click(function(event) {
                    //event.preventDefault();
                    //reload();
                    citySearch(city);
                });
                
            }

        } else {
            searchHistory = [];
        }
        
    });
}



function citySearch(citySearch) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&limit=1&units=imperial&appid=${weatherApiKey}`)
        .then(function (response) {
            return response.json();
        }).then(function (data) {

            //city name
            const cityNameEl = document.getElementById('city-input');
            const cityName = data.name;
            cityNameEl.textContent = cityName;

            //date 
            var currentDate = moment().format("MM/DD/YYYY");
            var currentDateEl = document.getElementById('date');
            currentDateEl.textContent = "(" + currentDate + ")";

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

            var searchInput = cityName;
            if (!searchHistory.includes(searchInput)) {
                searchHistory.unshift(searchInput);
                localStorage.setItem("city name", JSON.stringify(searchHistory));
            }

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=imperial&appid=${weatherApiKey}`)
                .then(function (response) {
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
                    var img = document.getElementById('icon-img');
                    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

                    //5 day forecast
                    for (var i = 1; i < 6; i++) {
                        console.log(dd[i]);
                        var dayCard = document.getElementById(`day${i}`);
                        var datedd = moment()
                            .add(i, "days")
                            .format("MM/DD/YYYY");
                        var dateddEl = document.getElementById(`datedd${i}`);
                        dateddEl.textContent = datedd;
                        var tempdd = Math.round(dd[i].temp.day);
                        var tempddEl = document.getElementById(`t${i}`);
                        tempddEl.textContent = "Temp: " + tempdd + "\u00B0F";
                        var wsdd = Math.round(dd[i].wind_speed);
                        var wsddEl = document.getElementById(`w${i}`);
                        wsddEl.textContent = "Wind: " + wsdd + " mph";
                        var humiditydd = dd[i].humidity;
                        var humidityddEl = document.getElementById(`h${i}`);
                        humidityddEl.textContent = "Humidity: " + humiditydd + "%";
                        var icondd = dd[i].weather[0].icon;
                        var img = document.getElementById(`img${i}`);
                        img.src = `https://openweathermap.org/img/wn/${icondd}@2x.png`
                        
        
                        dayCard.append(dateddEl, img, tempddEl, wsddEl, humidityddEl);
                        
                    }

                })
        });

}


searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    currentCity = cityInput.value;
    if (currentCity === "") {
        return;
    } else {
        citySearch(currentCity);
        
    }
});

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
        
    }
});

clearBtn.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
});




