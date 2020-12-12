var button = document.getElementById("btn");

button.addEventListener("click", myFunction);

function getCurrentWeather(searchValue) {
  fetch(
    //TODO Make a fetch request to Wikipedia to get a random article title
    `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=f342d8ed429b3194f07876e1383e2756&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      //!! use response to put current weather on page
      getUvIndex(lat, lon);
      //!! how to get lat and lon out of response
    });
}

function getFiveDayForecast(searchValue) {
  fetch(
    //TODO Make a fetch request to Wikipedia to get a random article title
    `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=f342d8ed429b3194f07876e1383e2756&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      //!! use response to put forecast on page
    });
}

function getUvIndex(lat, lon) {
  fetch(
    `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=f342d8ed429b3194f07876e1383e2756`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      //!! use response to put uv index on page
    });
}

function myFunction(event) {
  event.preventDefault();
  var searchValue = document.getElementById("inlineFormInputName2").value;
  console.log(searchValue);
  //!! create and use a function to save searchValue in list div in html
  getCurrentWeather(searchValue);
  getFiveDayForecast(searchValue);
}
