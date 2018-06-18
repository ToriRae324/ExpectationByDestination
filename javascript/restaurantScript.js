//will create API queries for zomato and ticketmaster
//this will help us determine what we need in our forms

//Zomato API key: b8fefdb1eb1eef0859aad5778cee33ad
//ticketMaster API key: cdS8dgGbDGzl3TTP71wEQpLkCA8G95Ig



var city = "Charlotte" //default on page load city
var state = "NC" //default on page load state
var zomatoSearch = city + ", " + state
var zomatoUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + zomatoSearch + "&count=1$apikey=b8fefdb1eb1eef0859aad5778cee33ad"
var cityID = ""
var count = ""
var establishment_type = ""
var sort = ""
var order = ""
var cuisineType = ""

//$("#search").on(click(function () {
    //city = $("city input").val().trim()
    //state = $(state input).val().trim()
$(document).ready(function () {

    $.ajax({
        url: zomatoUrl,
        method: "GET",
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                'b8fefdb1eb1eef0859aad5778cee33ad');
        },
    }).then(function (response) {
        // console.log(response)
        // console.log(response.location_suggestions[0].city_id)
        // console.log(response.location_suggestions[0].city_name)
        entityID = response.location_suggestions[0].city_id;
        entityType = "city";
        count = "10";
        sort = "rating";
        order = "desc";




        //Top rated API Search
        zomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&count=" + count + "&sort=" + sort + "&order=" + order
        console.log("top rated list:")
        $.ajax({
            url: zomatoUrl,
            method: "GET",
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('user-key',
                    'b8fefdb1eb1eef0859aad5778cee33ad');
            },
        }).then(function (response) {
            console.log(response, response.restaurants.length);

            for (var i = 0; i < response.restaurants.length; i++) {

                // convienience vars
                var response = response.restaurants[i].restaurant;

                var name = response.name;
                var rating = response.user_rating.aggregate_rating;
                var cuisines = response.cuisines;
                var thumbnail = response.thumb;
                var pairPrice = response.average_cost_for_two;
                var address = response.location.address;
                var url = response.url
                

                console.log(name + ":" + rating);
                console.log(cuisines, pairPrice, address);

                // Parse response into Card HTML
                var html = 
                '<div class="row"><div class="col-md-12"><div class="card"><div class="card-body"><h5 class="card-title"><i class="fas fa-star"></i>' + name + '</h5><h6 class="card-subtitle mb-2 text-muted">' + rating + '</h6><img class="restaurantImage" src=' + thumbnail + '><ul><li>Cuisines: ' + cuisines + '</li><li>Avg. Cost for Two: $' + pairPrice + '</li><li>Address: ' + address + '</li></ul><a href=' + url + 'class="card-link">More Details</a></div></div></div></div>';

                $("#restaurantDetails").append.html;



            };
        });
    
    //list of top rated italian restaurants
    /*
    console.log("Cuisine Search")

    cuisineType = "55"
    entityID = response.location_suggestions[0].entity_id
    entityType = "city"
    count = "10"
    sort = "rating"
    order = "desc"
    zomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id="+entityID+"&entity_type="+entityType+"&count="+count+"&cuisines=55&sort="+sort+"&order=" + order
    $.ajax({
        url: zomatoUrl,
        method: "GET",
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                'b8fefdb1eb1eef0859aad5778cee33ad');
        },
    }).then(function (response) {
        console.log(response)
        for (var i = 0; i < response.restaurants.length; i++) {
            console.log(response.restaurants[i].restaurant.name)
        }
    })
    */
})
});





