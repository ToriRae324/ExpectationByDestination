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

                console.log("Name: " + response.restaurants[i].restaurant.name)
                console.log("Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating)
                console.log("Cuisines: " + response.restaurants[i].restaurant.cuisines)
                console.log("Average Cost for Two: $" + response.restaurants[i].restaurant.average_cost_for_two)
                console.log("Currency: " + response.restaurants[i].restaurant.currency)
                console.log("Located: " + response.restaurants[i].restaurant.location.locality_verbose)
                console.log("Street Address:" + response.restaurants[i].restaurant.location.address)
                console.log("Website: " + response.restaurants[i].restaurant.url)
                console.log("Photo Url : " + response.restaurants[i].restaurant.photos_url)
                console.log("---------------")

                var info = response.restaurants[i].restaurant;

                var name = info.name;
                var rating = info.user_rating.aggregate_rating;
                var cuisines = info.cuisines;
                var thumbnail = info.thumb;
                var pairPrice = info.average_cost_for_two;
                var address = info.location.address;
                var url = info.url


                console.log(name + ":" + rating);
                console.log(cuisines, pairPrice, address);

                // Parse info into Card HTML
                var newDiv = $("<div>")
                newDiv.html('<div class="row"><div class="col-md-12"><div class="card"><div class="card-body"><h5 class="card-title"><i class="fas fa-star"></i>' + name + '</h5><h6 class="card-subtitle mb-2 text-muted">' + rating + '</h6><img class="restaurantImage" src=' + thumbnail + '><ul><li>Cuisines: ' + cuisines + '</li><li>Avg. Cost for Two: $' + pairPrice + '</li><li>Address: ' + address + '</li></ul><a href=' + url + 'class="card-link">More Details</a></div></div></div></div>')
                $("#restaurantDetails").append(newDiv);
            }
        })


        $("#locSub").on("click", function (event) {
            event.preventDefault()
            $("#restaurantDetails").empty()
            city = $("#inputCity").val().trim()
            state = $("#inputState").val().trim()
            zomatoSearch = city + ", " + state
            zomatoUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + zomatoSearch + "&count=1$apikey=b8fefdb1eb1eef0859aad5778cee33ad"

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

                        console.log("Name: " + response.restaurants[i].restaurant.name)
                        console.log("Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating)
                        console.log("Cuisines: " + response.restaurants[i].restaurant.cuisines)
                        console.log("Average Cost for Two: $" + response.restaurants[i].restaurant.average_cost_for_two)
                        console.log("Currency: " + response.restaurants[i].restaurant.currency)
                        console.log("Located: " + response.restaurants[i].restaurant.location.locality_verbose)
                        console.log("Street Address:" + response.restaurants[i].restaurant.location.address)
                        console.log("Website: " + response.restaurants[i].restaurant.url)
                        console.log("Photo Url : " + response.restaurants[i].restaurant.photos_url)
                        console.log("---------------")

                        var info = response.restaurants[i].restaurant;

                        var name = info.name;
                        var rating = info.user_rating.aggregate_rating;
                        var cuisines = info.cuisines;
                        var thumbnail = info.thumb;
                        var pairPrice = info.average_cost_for_two;
                        var address = info.location.address;
                        var url = info.url


                        console.log(name + ":" + rating);
                        console.log(cuisines, pairPrice, address);

                        // Parse info into Card HTML
                        var newDiv = $("<div>")
                        newDiv.html('<div class="row"><div class="col-md-12"><div class="card"><div class="card-body"><h5 class="card-title"><i class="fas fa-star"></i>' + name + '</h5><h6 class="card-subtitle mb-2 text-muted">' + rating + '</h6><img class="restaurantImage" src=' + thumbnail + '><ul><li>Cuisines: ' + cuisines + '</li><li>Avg. Cost for Two: $' + pairPrice + '</li><li>Address: ' + address + '</li></ul><a href=' + url + 'class="card-link">More Details</a></div></div></div></div>')
                        $("#restaurantDetails").append(newDiv);
                    }
                })


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


        })
    })
});

