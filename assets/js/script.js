const apiKey = '56cd55bcb41fb1d5dd1158c24bb37cc0';
const searchedCities = []; //stringify the local storage
var cCounter = 0
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
        
        
        $(".searchBtn").on("click", function(event) {
            event.preventDefault() //keeps page from refeshing 
            //calls the search item
            var city = $(this).siblings(".citySearch").val();
            //var cities = $(this).parent().attr('id');
            //if statement that will check the array for duplicate cities
            searchedCities.push(city);
            //puts the value in local storage
            localStorage.setItem("cities", city)
            


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
            
        });

var searchEl = function() {
    var btnEl = document.createElement('button')
    btnEl.className = "btn btn-second"
    btnEl.textContent = document.querySelector("input[name='city']")
    btnEl.setAttribute('data-city-id', cCounter);
    btnEl.setAttribute('id', 'searchBtn');
    btnEl.setAttribute('type', "submit");
}
var citieStorage = function() {
    var searchList = JSON.parse(localStorage.getItem('city'))

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


if (localStorage.getItem('city')) {
    JSON.parse(cities = localStorage.getItem('city'))
}
if (searchedCities.length !==0) {
    loadSearch();
}
//for loop through searchcities to display them. 

//$('#searchContainer .citySearch').val(localStorage.getItem("searchContainer"))

//var pastSearches = [];
   // pastSearches.push($('.citySearch').val());
    
