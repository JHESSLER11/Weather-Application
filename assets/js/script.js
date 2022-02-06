
$(".searchBtn").on("click", function() {
        var city = $(this).siblings(".citySearch").val();
        var what = $(this).parent().attr('id');
        localStorage.setItem(city, what)
});

//$('#searchContainer .citySearch').val(localStorage.getItem("searchContainer"))

var pastSearches = [];
    pastSearches.push($('.citySearch').val());
    
