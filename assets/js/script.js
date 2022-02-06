

function fetchApi() {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=56cd55bcb41fb1d5dd1158c24bb37cc0'

   $.ajax(apiUrl).done(function(response) {
       console.log(response)
   });
};

fetchApi()


$(".searchBtn").on("click", function() {
        var city = $(this).siblings(".citySearch").val();
        var what = $(this).parent().attr('id');
        localStorage.setItem(city, what)
});

//$('#searchContainer .citySearch').val(localStorage.getItem("searchContainer"))

var pastSearches = [];
    pastSearches.push($('.citySearch').val());
    
