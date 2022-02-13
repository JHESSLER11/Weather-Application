const historyKey = "weatherCitySearchHistory";
const historyBtnBsClasses = "btn btn-info border text-left";
const historyDataCityAttr = "data-city";
const API_Key = "56cd55bcb41fb1d5dd1158c24bb37cc0";

var searchHistory = JSON.parse(localStorage.getItem(historyKey)) || [];
console.log(searchHistory);

$("#search-bar").on("submit", handleSearching);
$("#previous-searches").on("click", handleHistoryItems);

history();

function history() {
  //showing all previous history
  renderTheHistory();

  //show the last city that was searched by the user
  if (searchHistory.length > 0) {
    CityWeather(searchHistory[searchHistory.length - 1]);
  }
}

function CityWeather(city) {
  console.log({ city });
  //weather from openweathermap

  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    API_Key;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#current-weather").text(
      response.name + " (" + moment().format("l") + ")"
    );
    $("#weatherIcon").attr("src", weatherIconURL(response.weather[0].icon));
    // get temp in f
    $("#temp").text(
      ((response.main.temp.toFixed(1) - 273.15) * 1.8 + 32).toFixed(2)
    );
    $("#humidity").text(response.main.humidity);
    $("#wind").text(response.wind.speed);
    $("#current-weather").attr("style", "display: block");
    //console.log({ response });

    var uvURL =

      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      response.coord.lat +
      "&lon=" +
      response.coord.lon +
      "&exclude=" +
      "&appid=" +
      API_Key;

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (UVresponse) {
      $("#uv-Index").text(UVresponse.current.uvi);
      var uvIndex = UVresponse.current.uvi;
      console.log(typeof uvIndex);
      //setting uvIndex color on the background from function at the bottom for appropriate color
      console.log($("#uv-Index").text(UVresponse.current.uvi));
      var sVal = $("#uv-Index").text(uvIndex);
      var iNum = parseInt(sVal);

      $("#uv-Index").attr("style", function getUVColor() {
        if (uvIndex <= 3.0) {
          return "background-color: green; color: white";
        } else if (uvIndex <= 6.0 && uvIndex > 3.0) {
          return "background-color: yellow; color: black";
        } else if (uvIndex <= 9.0 && uvIndex > 6.0) {
          return "background-color: red; color: black";
        } else {
          return "background-color: teal; color: white";
        }
      });
      //display uv color
      $("#uvIndexColor").attr("style", "display: block");
    });

    //current city weather categories being returned
  });

  //future 5-day weather forcast
  var forcastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    API_Key;
  $.ajax({
    url: forcastURL,
    method: "GET",
  }).then(function (response) {
    var listingIndex = GoodStartIndex(response);
    var listing = response.list;

    //for loop to update the 5-day weather
    for (var i = 1; i <= 5; i++) {
      var eachDay = $("#forecast-" + i);
      eachDay
        .find("h5")
        .text(moment(listing[listingIndex].dt * 1000).format("l"));
      eachDay
        .find("img")
        .attr("src", weatherIconURL(listing[listingIndex].weather[0].icon));
      eachDay
        .find(".temp")
        .text(
          (
            (listing[listingIndex].main.temp.toFixed(1) - 273.15) * 1.8 +
            32
          ).toFixed(2)
        );
      eachDay.find(".humidity").text(listing[listingIndex].main.humidity);
      eachDay.find(".wind").text(listing[listingIndex].wind.speed);
      listingIndex += 8;
    }
    $("#future-forecast").attr("style", "display: block");
  });
}

//get search box user input, clear the search box, then add the search to history and show what the weather is for the searched city
function handleSearching(event) {
  event.preventDefault();
  var city = $("#city-input").val().trim();
  $("#city-input").val("");
  addHistoryCity(city);
  CityWeather(city);
}

function handleHistoryItems(event) {
  if (event.target.matches("button")) {
    CityWeather($(event.target).attr(historyDataCityAttr));
  }
}

//creating button on each of the previous searched cities to re-render in the data feild cards if the user chooses to look back at past searches
function renderTheHistory() {
  var searchingHistory = $("#previous-searches");
  searchingHistory.empty();
  searchHistory.forEach((city) => {
    var btn = $("<button>").addClass(historyBtnBsClasses);
    btn.attr(historyDataCityAttr, city);
    btn.text(city);
    searchingHistory.append(btn);
  });
}

//5-day 3-hour forcasts starting point
function GoodStartIndex(response) {
  var listing = response.list;
  var startingIndex = 8;
  do {
    startingIndex--;
    indexHour = parseInt(moment(listing[startingIndex].dt * 1000).format("H"));
  } while (indexHour >= 15 && startingIndex > 0);

  return startingIndex;
}

//adding to history searches list
function addHistoryCity(city) {
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem(historyKey, JSON.stringify(searchHistory));
    renderTheHistory();
  }
}

//getting a weather icon that matches the current weather data
function weatherIconURL(iconCode) {
  return "https://openweathermap.org/img/w/" + iconCode + ".png";
}