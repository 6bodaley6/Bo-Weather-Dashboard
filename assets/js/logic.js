var button = document.getElementById("btn");

getFromLocalStorage();
var local = JSON.parse(window.localStorage.getItem("Cities"));
if (local) {
  getCurrentWeather(local[local.length - 1]);
  getFiveDayForecast(local[local.length - 1]);
} else {
  getCurrentWeather("Salt Lake City");
  getFiveDayForecast("Salt Lake City");
}
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
      if (response.cod == "400") {
        return;
      }
      document.getElementById("tempurature").innerHTML =
        "Tempurature: " + response.main.temp;
      document.getElementById("humidity").innerHTML =
        "Humidity: " + response.main.humidity;
      document.getElementById("wind-speed").innerHTML =
        "Wind Speed: " + response.wind.speed;
      var title = document.getElementById("selected-city");

      var icon = document.createElement("img");
      icon.src =
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      title.textContent = searchValue;
      title.appendChild(icon);

      getUvIndex(response.coord.lat, response.coord.lon);
    })
    .catch((error) => console.log(error));
}
//TODO Wrap everything in a card
function getFiveDayForecast(searchValue) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=f342d8ed429b3194f07876e1383e2756&units=imperial`
  )
    .then(function (response) {
      if (response.ok) return response.json();
    })
    .then(function (response) {
      console.log(response);

      var weatherCards = document.getElementById("weather-cards");
      // weatherCards.classList.add("p-3 mb-2 bg-primary text-white");

      weatherCards.innerHTML = "";
      document.createElement("h4");
      for (var i = 0; i < 5; i++) {
        var cardEl = document.createElement("div");
        cardEl.classList.add("col-2", "card");
        var date = document.createElement("p");
        date.innerHTML = new Date(response.list[i].dt_txt).toLocaleDateString();
        cardEl.appendChild(date);

        var icon = document.createElement("img");
        icon.src =
          "https://openweathermap.org/img/w/" +
          response.list[i].weather[0].icon +
          ".png";

        console.log(response);
        cardEl.appendChild(icon);

        var temp = document.createElement("p");
        temp.innerHTML = "Temp: " + response.list[i].main.temp + "°F";
        cardEl.appendChild(temp);

        var humidity = document.createElement("p");
        humidity.innerHTML =
          "Humidity: " + response.list[i].main.humidity + "%";
        cardEl.appendChild(humidity);

        weatherCards.appendChild(cardEl);
      }
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
      document.getElementById("uv-index").innerHTML =
        "UV Index: " + response.value;
    });
}

function myFunction(event) {
  event.preventDefault();
  var form = document.getElementById("inlineFormInputName2");
  var searchValue = form.value;
  form.innerHTML = "";

  console.log(searchValue);
  getCurrentWeather(searchValue);
  getFiveDayForecast(searchValue);
  saveSearchValue(searchValue);
}

function saveSearchValue(searchValue) {
  var cities = JSON.parse(window.localStorage.getItem("Cities")) || [];
  cities.push(searchValue);
  var citiesFiltered = cities.filter(function (city) {
    return city.trim();
  });
  var unique = [...new Set(citiesFiltered)];
  window.localStorage.setItem("Cities", JSON.stringify(unique));
  if (searchValue === unique[unique.length - 1]) {
    var li = document.createElement("li");
    li.classList.add("list-group-item", "list-group-item-action");
    li.textContent = searchValue;
    li.onclick = function () {
      getCurrentWeather(searchValue);
      getFiveDayForecast(searchValue);
    };
    document.getElementById("search-history").appendChild(li);
  }
}
function getFromLocalStorage() {
  var cities = JSON.parse(window.localStorage.getItem("Cities")) || [];
  cities.forEach((city) => {
    saveSearchValue(city);
  });
}
