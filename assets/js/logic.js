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
      if (response.ok) return response.json();
    })
    .then(function (response) {
      console.log(response);
      for (var i = 0; i < 5; i++) {
        var cardEl = document.createElement("div"); //how do i get my data points and put in each card?: Is it append child on each of the var below

        var date = document.createElement("p");
        date.innerHTML = response.list[i].dt;
        cardEl.appendChild(date);

        var icon = document.createElement("img");
        icon.src = "";
        cardEl.appendChild(icon);

        var temp = document.createElement("p");
        temp.innerHTML = response.list[i].main.temp;
        cardEl.appendChild(temp);

        var humidity = document.createElement("p");
        humidity.innerHTML = response.list[i].humidity;
        cardEl.appendChild(humidity);

        //TODO create new 4 elements for each card
        // Create 4 data elements for each card appendChild
        // Insert data into each card after the 5 cards have the data append the parent element
        // take card then append each card to page at end of loop inside that card elements
        // at each completed iteration of the loop
        //TODO response to display each card
        var weatherCards = document.getElementById("weather-cards");
        weatherCards.appendChild(cardEl);
      }
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
