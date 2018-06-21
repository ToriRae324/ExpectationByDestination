//will create API queries for zomato and ticketmaster
//this will help us determine what we need in our forms

//Zomato API key: 8e3c68c31ec53ec6cbd05ad1cd8d8174
//zomato api key2: b8fefdb1eb1eef0859aad5778cee33ad

//ticketMaster API key: cdS8dgGbDGzl3TTP71wEQpLkCA8G95Ig
//pulled origin master


//global variables declared
var success = false
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
var latitude;
var longitude;
var entityID

$(document).ready(function () {
    getLocation()
})
//function run when page loads
function search(x) {
    //displays the current city onto the page(in this case it is the default city)
    entityID = x
    entityType = "city";
    count = "10";
    sort = "rating";
    order = "desc";


    //zomatoUrl is altered to perform a top rated search on the defualt city
    zomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&count=" + count + "&sort=" + sort + "&order=" + order
    //ajax function is performed\
    $.ajax({

        url: zomatoUrl,//updated zomatoUrl is used
        method: "GET",
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                'b8fefdb1eb1eef0859aad5778cee33ad');
        },
    }).then(function (response) {
        //console is cleared to keep it from filling up to much
        //console.clear()
        //populate function is called with response as argument
        //this function fills in results found from API search into the html and console
        $("#restaurantDetails").empty()
        populate(response)
    })
    //runs when user selects the submit button after filling in city and state form
    $("#locSub").on("click", function (event) {
        event.preventDefault()
        
        // if/else to validate user data
        if ($("#inputCity").val() === "" || $("#inputState").val() === "Choose...") {
            $("#modal").modal("toggle");

        } else {

            $("#restaurantDetails").empty()//clears restaurantDetails div
            city = $("#inputCity").val().trim()//changes prev city to submitted city 
            state = $("#inputState").val().trim()//changes prev state to submitted city
            displayCity()//displays new city info on page
            zomatoSearch = city + ", " + state//changes zomatoSearch to new city/state
            zomatoUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + zomatoSearch + "&count=1$apikey=b8fefdb1eb1eef0859aad5778cee33ad"
            //ajax function run
            $.ajax({
                url: zomatoUrl,//pulls updated zomatoUrl
                method: "GET",
                async: true,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('user-key',
                        'b8fefdb1eb1eef0859aad5778cee33ad');
                },
            }).then(function (response) {

                //updates entity id
                entityID = response.location_suggestions[0].city_id;
                entityType = "city";
                count = "10";
                sort = "rating";
                order = "desc";
                //searches top rated list from api using new entity_id so it will be of the new city
                zomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&count=" + count + "&sort=" + sort + "&order=" + order
                console.log("top rated list:")
                $.ajax({
                    url: zomatoUrl,//searches with updated url
                    method: "GET",
                    async: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('user-key',
                            'b8fefdb1eb1eef0859aad5778cee33ad');
                    },
                }).then(function (response) {
                    //console.clear()//clears console
                    $("#restaurantDetails").empty()
                    populate(response)//calls populate function with new information of new city
                })

            })
        }
    })
    //run when a cuisine option is clicked from the cuisine dropdown menu
    $(".cuisineBtn").on("click", function (event) {
        event.preventDefault()
        //clears restaurant details div
        
        cuisineType = $(this).val()//gathers cuisine type from the value of the option clicked
        entityType = "city"
        count = "10"
        sort = "rating"
        order = "desc"
        //updates url to do a cuisine search
        zomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&count=" + count + "&cuisines=" + cuisineType + "&sort=" + sort + "&order=" + order
        $.ajax({
            url: zomatoUrl,
            method: "GET",
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('user-key',
                    'b8fefdb1eb1eef0859aad5778cee33ad');
            },
        }).then(function (response) {
            //console.clear()//clears console
            $("#restaurantDetails").empty()
            populate(response)//fills console and html

        })
    })

    $(".establishmentBtn").on("click", function (event) {
        event.preventDefault()

        //clears restaurant details div
        
        establishment_type = $(this).val()//gathers establishment type from the value of the option clicked
        entityType = "city"
        count = "10"
        sort = "rating"
        order = "desc"
        //updates url to do a establishment search
        zomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&count=" + count + "&establishment_type=" + establishment_type + "&sort=" + sort + "&order=" + order
        $.ajax({
            url: zomatoUrl,
            method: "GET",
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('user-key',
                    'b8fefdb1eb1eef0859aad5778cee33ad');
            },
        }).then(function (response) {
            //console.clear()//clears console
            $("#restaurantDetails").empty()
            populate(response)//fills console and html

        })
    })

    //when top rated button is clicked it will populate the html and console with the ten highest rated restaurants of that city
    $("#topRated").on("click", function (event) {
        event.preventDefault()
        //clears restaurant details div
        

        entityType = "city"
        count = "10"
        sort = "rating"
        order = "desc"
        //updates url to do a top rated search on the city you are currently in
        zomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&count=" + count + "&sort=" + sort + "&order=" + order
        $.ajax({
            url: zomatoUrl,
            method: "GET",
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('user-key',
                    'b8fefdb1eb1eef0859aad5778cee33ad');
            },
        }).then(function (response) {
            //console.clear()//clears console
            $("#restaurantDetails").empty()
            populate(response)//fills console and html

        })

    })
}


// on click show/hide restaurants/events
$("#restaurantsBtn").on("click", function () {
    $("#restaurantDisplay").css("display", "flex");
    $("#eventDisplay").hide();
});
$("#eventsBtn").on("click", function () {
    $("#eventDisplay").css("display", "flex");
    $("#restaurantDisplay").hide();
});
//dunction used to display info, arguments: ajax response and for loop iterator
function displayInfo(response, i) {
    //declares and initalizes loval variables of info that we want to display from the API
    var info = response.restaurants[i].restaurant;

    var name = info.name;
    var rating = info.user_rating.aggregate_rating;
    var cuisines = info.cuisines;

    var thumbnail = info.thumb;

    var pairPrice = info.average_cost_for_two;
    var address = info.location.address;
    var url = info.url;


    //console.log(thumbnail)
    thumbnail = checkImages(thumbnail)
    // Parse info into Card HTML
    var newDiv = $('<div class="row restaurantItem">')
    newDiv.html('<div class="col-md-12"><div class="card"><div class="card-body"><h5 class="card-title"><i class="fas fa-star"></i>' + name + '</h5><h6 class="card-subtitle mb-2 text-muted">' + rating + '</h6><img class="restaurantImage" src="' + thumbnail + '"><ul><li><strong>Cuisines: </strong>' + cuisines + '</li><li><strong>Avg. Cost for Two: </strong>$' + pairPrice + '</li><li><strong>Address:</strong> ' + address + '</li></ul><a href=' + url + 'class="card-link" target="_blank">More Details</a></div></div></div>')
    //append the new div into the restaurant detail section
    $("#restaurantDetails").append(newDiv);
}
//function that fills console with information pulled from the api, arguments: response of ajax function and for loop iterator
function consoleInfo(response, i) {
    console.log("Name: " + response.restaurants[i].restaurant.name)
    console.log("Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating)
    console.log("Cuisines: " + response.restaurants[i].restaurant.cuisines)
    console.log("Average Cost for Two: $" + response.restaurants[i].restaurant.average_cost_for_two)
    console.log("Currency: " + response.restaurants[i].restaurant.currency)
    console.log("Located: " + response.restaurants[i].restaurant.location.locality_verbose)
    console.log("Street Address:" + response.restaurants[i].restaurant.location.address)
    console.log("Website: " + response.restaurants[i].restaurant.url)
    console.log("Photo Url : " + response.restaurants[i].restaurant.photos_url)
    console.log("thumbnail Url : '" + response.restaurants[i].restaurant.thumb + "'")
    console.log("---------------")
}
//populate function fills html and console with information
function populate(response) {
    //creates for loop to allow all objects to be pulled from the api
    for (var i = 0; i < response.restaurants.length; i++) {
        //consoleInfo(response, i)//calls console info to fill console
        displayInfo(response, i)//calls displayInfo to fill html page
    }
}
//function takes current city the user is on and displays it in the currentCity span
function displayCity() {
    $("#currentCity").text(city + ", " + state)//takes city and state global variables and displays them
}


function checkImages(thumbnail) {

    if (thumbnail === "") {
        thumbnail = "images/foodicon.png"
    }
    else {
        //image src is there
    }
    return thumbnail

}






function getLocation() {

        navigator.geolocation.watchPosition(function (position) {
            console.log("approved")
            $("#restaurantDetails").empty()
            navigator.geolocation.getCurrentPosition(showPosition)
        },
            function (error) {
                if (error.code == error.PERMISSION_DENIED)
                    entityID = 288
                displayLocation("Atlanta, Ga")
                $("#restaurantDetails").empty()
                search(entityID)
                eventSearch("Atlanta", "Ga")
            });

    }


function showPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    console.log("working1")
    zomatoUrl = "https://developers.zomato.com/api/v2.1/cities?lat=" + latitude + "&lon=" + longitude + "&count=1"
    $.ajax({
        
        url: zomatoUrl,
        method: "GET",
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                'b8fefdb1eb1eef0859aad5778cee33ad');
        },
    }).then(function (response) {
        console.log("working2")
        var currentEntityID = response.location_suggestions[0].id
        var locName = response.location_suggestions[0].name
        console.log(currentEntityID)
        displayLocation(locName)
        var cityNameArr = locName.split(", ")
        console.log(cityNameArr[0])
        console.log(cityNameArr[1])
        search(currentEntityID)
        eventSearch(cityNameArr[0], cityNameArr[1])
    })

}
function displayLocation(name) {
    $("#currentCity").text(name)
}



