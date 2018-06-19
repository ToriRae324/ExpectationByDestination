//ticketMaster API key: cdS8dgGbDGzl3TTP71wEQpLkCA8G95Ig

$(document).ready(function(){

    var city = "";
    var state = "";
    // var eventType = "";


    //accessibility
    //classifications
    //id
    //images
    //locale
    //name
    //promoter
    //promoters
    //sales
    //seatmap
    //test
    //type
    //url
    //_embedded.venues."index"
    //radius
    //keyword
    //startDateTime
    //endDateTime
    //size






function eventSearch(){

    
    var ticketMasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&stateCode=" + state + "&keyword=" + "&apikey=cdS8dgGbDGzl3TTP71wEQpLkCA8G95Ig"
    $.ajax({
        url: ticketMasterUrl,
        method: "Get",
        async:true,
        dataType: "json",
    }).then(function (response) {
        console.log(response);
        

        
        var results = response._embedded.events;
        
        for (var i = 0; i < results.length; i++){
            
            
            //creating a div with all its components
            var eventDiv = $("<div class='col-md-4'>");
            
            var newP = $("<p class='event-name'>").text(results[i].name);
            var eventSpace = $("<img class='event-image'>");
            eventSpace.attr("src", results[i].images[4].url);
            var venue = $("<p class='venue-name'>").text(results[i]._embedded.venues[0].name);
            var priceRange = $("<p class='event-info'>").text("Tickets from: $" + results[i].priceRanges[0].min + " - $" + results[i].priceRanges[0].max);

            // var eventDate = moment().format(results[i].dates.start.localDate, "YYYY/DD/MM");
            // var eventTime = moment().format(results[i].dates.start.localTime,"HH:mm:ss");

            // var localDate = moment(eventDate).format("MM/DD/YYYY");
            // var localTime = moment(eventTime).format("hh:mm a");

            var dateTimeStr = results[i].dates.start.localDate + " " + results[i].dates.start.localTime;
            var dateTimeMoment = moment(dateTimeStr, "YYYY/DD/MM hh:mm");

            var localDate = dateTimeMoment.format("MM/DD/YYYY");
            var localTime = dateTimeMoment.format("hh:mm a");

            var playDates = $("<p class='event-info'>").text(localDate + "@" + localTime);
            var eventInfo = $("<p class='event-info'>").html("<a href="+results[i].url+">More Info</a>");
            
            // console.log(results[i].name);
            // console.log("------------------");
            // console.log(venue);
            // console.log(priceRange);
            // console.log(playDates);
            // console.log("------------------");

            eventDiv.append(newP);
            eventDiv.append(eventSpace);
            eventDiv.append(venue);
            eventDiv.append(priceRange);
            eventDiv.append(playDates);
            eventDiv.append(eventInfo);

            $("#eventRow").append(eventDiv);
        };
    });
};
    
    $("#locSub").on("click", function(event){
        event.preventDefault();
        city = $("#inputCity").val();
        state = $("#inputState").val();
        // eventType = $("#event-type-input").val();
        $("#eventRow").html("");
        eventSearch();
        
    });
        




    //FOR FILTERING EVENTS BY TYPE IN THE EVENT SEARCH FIELD

    
    // $("#event-filter").on("click", function(event){
    //     city = $("#inputCity").val();
    //     state = $("inputState").val();
    //     eventType = $("eventFilter").val();
    // })
});



