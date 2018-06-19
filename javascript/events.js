//ticketMaster API key: cdS8dgGbDGzl3TTP71wEQpLkCA8G95Ig

$(document).ready(function(){
    
    var city = "Charlotte";
    var state = "NC";
    var eventType = "";
    var family = 0;
    
    
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
        
        var ticketMasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&stateCode=" + state + "&classificationName=" + eventType + "&apikey=cdS8dgGbDGzl3TTP71wEQpLkCA8G95Ig"
        $.ajax({
            url: ticketMasterUrl,
            method: "Get",
            async:true,
            dataType: "json",
        }).then(function (response) {
            console.log(response);
            
            
            
            var results = response._embedded.events;
            
            var sorted = results.sort(function (a, b){
                return moment(a.dates.start.dateTime).format("x") - moment(b.dates.start.dateTime).format("x");
            });
            console.log(sorted);

        for (var i = 0; i < results.length; i++){
            
            
            //creating a div with all its components
            var eventDiv = $("<div class='col-md-5'>");
            var eventDivOffset = $("<div class='col-md-1>");
            
            var newP = $("<p class='event-name'>").text(results[i].name);
            var eventSpace = $("<img class='event-image'>");
            eventSpace.attr("src", results[i].images[4].url);
            var venue = $("<p class='venue-name'>").text(results[i]._embedded.venues[0].name);
            var priceRange = $("<p class='event-info'>").text("Tickets from: $" + results[i].priceRanges[0].min + " - $" + results[i].priceRanges[0].max);
            
            // var eventDate = moment().format(results[i].dates.start.localDate, "YYYY/DD/MM");
            // var eventTime = moment().format(results[i].dates.start.localTime,"HH:mm:ss");

            // var localDate = moment(eventDate).format("MM/DD/YYYY");
            // var localTime = moment(eventTime).format("hh:mm a");

            // var dateTimeStr = results[i].dates.start.localDate + " " + results[i].dates.start.localTime;
            var dateTimeMoment = moment(results[i].dates.start.dateTime);

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

            var divOffSetStatus = 0;
            if (divOffSetStatus === 0){
                $("#eventRow").append(eventDivOffset);
                $("#eventRow").append(eventDiv);
                divOffSetStatus = 1;
            }

            else if (divOffSetStatus === 1){
                $("#eventRow").append(eventDiv);
                $("#eventRow").append(eventDivOffset);
                divOffSetStatus = 0;
            }


        };
    });

};
eventSearch();

    $("#locSub").on("click", function(event){
        event.preventDefault();
        city = $("#inputCity").val();
        state = $("#inputState").val();
        eventType = "";
        // eventType = $("#event-type-input").val();
        $("#eventRow").html("");
        eventSearch();
        
    });

    $(".eventFilters").on("click", function(){
        
        //filter
        eventType = $(this).data("value");
        $("#eventRow").empty();
        eventSearch();
    });

    
    
    
    
    
    // $("#familyFilter").on("click", function(){
    //     $("eventRow").empty();
    //     family = 1;
    //     eventSearch();   
    // });

        




    //FOR FILTERING EVENTS BY TYPE IN THE EVENT SEARCH FIELD

    
    // $("#event-filter").on("click", function(event){
    //     city = $("#inputCity").val();
    //     state = $("inputState").val();
    //     eventType = $("eventFilter").val();
    // })
});



