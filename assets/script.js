//step 1 :define all your html static selectors
var cityEl = document.querySelector("#city");
var cityFormEl = document.querySelector("#city-form");
var cityHeaderEl = document.querySelector("#city-header");
var TempEl = document.querySelector("#temp");
var uviEl = document.querySelector("#uvi");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var cityHeaderCard1El = document.querySelector("#city-header-card-1");
var cityHeaderCard2El = document.querySelector("#city-header-card-2");
var cityHeaderCard3El = document.querySelector("#city-header-card-3");
var cityHeaderCard4El = document.querySelector("#city-header-card-4");
var cityHeaderCard5El = document.querySelector("#city-header-card-5");
var api = "43307f36c133c1b4d80feb3644b2ab3e";

//step2: make an addEventListener on Submit and create displayDashboard - it shows current weather and last five day

function displayWeather(event) {
  event.preventDefault();
  var cityName = cityEl.value;
  var urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=imperial`;

  fetch(urlCurrent)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentData) {
      var oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&exclude={part}&appid=${api}&units=metric`;

      fetch(oneCallApi)
        .then(function (response) {
          return response.json();
        })
        .then(function (onedayData) {
          console.log(onedayData);
          console.log(onedayData.current.temp);
          console.log(onedayData.current.uvi);
          console.log(onedayData.current.wind_speed);
          console.log(onedayData.current.humidity);
          console.log(onedayData.current.temp);
          console.log(onedayData.current.weather[0].icon);

          var currentDate = moment.unix(currentData.dt).format("MM/DD/YYYY");
          var iconImage = document.createElement("img");
          iconImage.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${onedayData.current.weather[0].icon}@2x.png`
          );
          cityHeaderEl.innerHTML = currentData.name + " " + currentDate;
          cityHeaderEl.appendChild(iconImage);
          TempEl.textContent = onedayData.current.temp;
          humidityEl.textContent = onedayData.current.humidity;
          windEl.textContent = onedayData.current.wind_speed;
          uviEl.textContent = onedayData.current.uvi;
        });
    });
}

cityFormEl.addEventListener("submit", displayWeather);
