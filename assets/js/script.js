const apiKey = '56cd55bcb41fb1d5dd1158c24bb37cc0';
const searchCity = $('.citySearch');
const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`


fetch(url)
.then(function (response) {
    let data = response.json()
    return data
})
.then(function(data) {

});
    //msg.textContent = "search for a real city";
// function fetchApi() {
//     var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=asheville,NC,US&limit=56cd55bcb41fb1d5dd1158c24bb37cc';

//    $.ajax(apiUrl).done(function(response) {
//        console.log(response)
//    });
// };

//fetchApi()


$(".searchBtn").on("click", function() {
        var city = $(this).siblings(".citySearch").val();
        var what = $(this).parent().attr('id');
        localStorage.setItem(city, what)
});

//$('#searchContainer .citySearch').val(localStorage.getItem("searchContainer"))

var pastSearches = [];
    pastSearches.push($('.citySearch').val());
    
