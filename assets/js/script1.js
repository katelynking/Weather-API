var weatherApiKey = "e90149d5df606728396540fdb296f657";
var cityInput = document.getElementById('city-name');
var searchBtn = document.getElementById('search-btn');


function citySearch (citySearch) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + citySearch + "&limit=1&appid=" + weatherApiKey).then(response => {
        // console.log(response);
        return response.json();
    }).then(data => {
        console.log(data);
    });
}




searchBtn.addEventListener ('click', function(event) {
    event.preventDefault();
    // console.log(cityInput.value);
    var city = cityInput.value;
citySearch(city);
})

