const apiKey = '56cd55bcb41fb1d5dd1158c24bb37cc0';
const searchedCities = []; //stringify the local storage
var cCounter = 0
const historyDataCityAttr = "data-city";
const historyBtnBsClasses = "btn btn-dark border text-left";
//const searchCity = $('.citySearch');
//const searchCity = $('#searchForm .citySearch').val(localStorage.getItem("searchForm"))
//msg.textContent = "search for a real city";
// function fetchApi() {
    //     var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=asheville,NC,US&limit=56cd55bcb41fb1d5dd1158c24bb37cc';
    
    //    $.ajax(apiUrl).done(function(response) {
        //        console.log(response)
        //    });
        // };
        
        //fetchApi()
 //search city API        
function searchWeather (city) {
        
            //event.preventDefault() //keeps page from refeshing 
            //calls the search item
            //var city = $(".citySearch").val();
            //var cities = $(this).parent().attr('id');
            //if statement that will check the array for duplicate cities
            //puts the value in local storage
            //searchedCities.push(city);
            //localStorage.setItem("cities", city)
            //console.log(city)
            


            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            
            console.log(url)
            fetch(url)
            .then(function (response) {
                let data = response.json()
                return data
            })
            .then(function(data) {
            console.log(data)
            });

        };
        $("#searchForm").on("submit", handleSearch)


//displays the searched for city 
function searchEl() {
    var recentSearch = $('.recentSearch')
    searchedCities.forEach((city) => {
        var btnEl = $("<button>").addClass(historyBtnBsClasses);
        btnEl.attr(historyDataCityAttr, city);
        btnEl.text(city);
        recentSearch.append(btnEl);

    })
    // btnEl.className = "btn btn-second"
    // btnEl.textContent = document.querySelector("input[name='cities']")
    // btnEl.setAttribute('data-city-id', cCounter);
    // btnEl.setAttribute('id', 'searchBtn');
    // btnEl.setAttribute('type', "submit");
}

function handleSearch(event) {

    event.preventDefault();
    var city = $(".citySearch").val();
    searchedCities.push(city);
    localStorage.setItem("cities", city)
    
    searchWeather(city)
    searchEl()

}
//takes cities from local storage and displays them on the page with refresh
var citieStorage = function() {
    var searchList = JSON.parse(localStorage.getItem('cities'))

    for (let index = 0; index < searchList.length; index++) {
        var btnEl = document.createElement('button')
        btnEl.className = "btn btn-second"
        btnEl.textContent = searchList[index];
        btnEl.setAttribute('data-city-id', cCounter);
        btnEl.setAttribute('id', 'searchBtn');
        btnEl.setAttribute('type', "submit");
    console.log(index)
};
}


// if (localStorage.getItem('cities')) {
//     JSON.parse(cities = localStorage.getItem('cities'))
// }
// if (searchedCities.length !==0) {
//     citieStorage();
// }
//for loop through searchcities to display them. 

//$('#searchContainer .citySearch').val(localStorage.getItem("searchContainer"))

//var pastSearches = [];
   // pastSearches.push($('.citySearch').val());
    
