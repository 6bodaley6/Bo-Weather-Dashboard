var button = document.getElementById("btn");

button.addEventListener("click", myFunction);

function getCurrentWeather(searchValue) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=f342d8ed429b3194f07876e1383e2756&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      //!! use response to put current weather on page
      document.getElementById("tempurature").innerHTML =
        "Tempurature: " + response.main.temp;
      document.getElementById("humidity").innerHTML =
        "Humidity: " + response.main.humidity;
      document.getElementById("wind-speed").innerHTML =
        "Wind Speed: " + response.wind.speed;

      getUvIndex(response.coord.lat, response.coord.lon);
    });
}

//TODO START
function getFiveDayForecast(searchValue) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=f342d8ed429b3194f07876e1383e2756&units=imperial`
  )
    .then(function (response) {
     if (response.ok)
     response.json().then(function(response){
         for (var i = 0; < response.list.length)
     });
        return response.json();
    })
    //?? should I do it the way below or do the if statment
    .then(function (response) {
      console.log(response);
      document.getElementById("weather-cards").innerHTML =
        "5 Day Forecast: " + response;

      //!! use response to put forecast on page
    });
}
//TODO END

function getUvIndex(lat, lon) {
  fetch(
    `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=f342d8ed429b3194f07876e1383e2756`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      document.getElementById("uv-index").innerHTML =
        "UV Index: " + response.value;
    });
}

function myFunction(event) {
  event.preventDefault();

  var searchValue = document.getElementById("inlineFormInputName2").value;
  console.log(searchValue);
  //!! create and use a function to save searchValue in list div in html
  getCurrentWeather(searchValue);
  getFiveDayForecast(searchValue);
  saveSearchValue();
}

function saveSearchValue(searchValue) {
  //   if (searchValue >= 0) {
  var li = document.createElement("li");
  var searchValue = document.getElementById("inlineFormInputName2").value;
  li.textContent = searchValue;
  document.getElementById("search-history").appendChild(li);
  //   }
}
