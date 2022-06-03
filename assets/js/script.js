var weatherApiKey = "e90149d5df606728396540fdb296f657";
var cityInput = document.getElementById('city-search');
var searchBtn = document.getElementById('searchBtn');
var locations = document.getElementsByClassName("locations");

function citySearch (citySearch) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + citySearch + "&limit=1&appid=" + weatherApiKey).then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        $("#current").empty();
        getWeather(data, data[0].name);
    });
}

function getWeather (data, cityName) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&exclude=alerts&appid=$" + weatherApiKey).then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
    })
    .catch((err) => console.error(err));
}

searchBtn.addEventListener("click", function() {
    console.log(cityInput.value);
    var city = cityInput.value;

citySearch(city);
});
