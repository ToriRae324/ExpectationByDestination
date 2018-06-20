//ticketMaster API key: cdS8dgGbDGzl3TTP71wEQpLkCA8G95Ig

$(document).ready(function(){
    
    var city = "Charlotte";
    var state = "NC";
    var eventType = "";
    var family = 0;
      
    //Function runs the search on the TicketMaster API.
    function eventSearch(){
        
        var ticketMasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&stateCode=" + state + "&classificationName=" + eventType + "&apikey=cdS8dgGbDGzl3TTP71wEQpLkCA8G95Ig"
        $.ajax({
            url: ticketMasterUrl,
            method: "Get",
            async:true,
            dataType: "json",
        }).then(function (response) {
            console.log(response);
            
            
            //Store Response from TicketMastre
            var results = response._embedded.events;
            
            //Sort the response in order to list data in order of upcoming dates.
            var sorted = results.sort(function (a, b){
                return moment(a.dates.start.dateTime).format("x") - moment(b.dates.start.dateTime).format("x");
            });
            console.log(sorted);

        for (var i = 0; i < results.length; i++){
            
            
            //creating a div with all its components
            var eventDiv = $("<div class='col-md-5'>");
            var eventDivOffset = $("<div class='col-md-1>");
            
            //Storing data we want to utilize
            var newP = $("<p class='event-name'>").text(results[i].name);
            var eventSpace = $("<img class='event-image'>");
            eventSpace.attr("src", results[i].images[4].url);
            var venue = $("<p class='venue-name'>").text(results[i]._embedded.venues[0].name);

            //created if statement to kep the sport filter from erroring.
            if (results[i].hasOwnProperty('priceRanges')){
                var priceRange = $("<p class='event-info'>").text("Tickets from: $" + results[i].priceRanges[0].min + " - $" + results[i].priceRanges[0].max);
            }

            
           //Creating a moment in order to reformat the date to be displayed to the user.
            var dateTimeMoment = moment(results[i].dates.start.dateTime);

            var localDate = dateTimeMoment.format("MM/DD/YYYY");
            var localTime = dateTimeMoment.format("hh:mm a");

            var ticketMasterSearch = "https://www.ticketmaster.com/search?tm_link=tm_header_search&q="+city+"+"+state+"+"+results[i].name;

            var playDates = $("<p class='event-info'>").text(localDate + "@" + localTime);
            var eventInfo = $("<p class='event-info'>").html("<a target='_blank' href="+ticketMasterSearch+">Visit Ticket Master Here</a>");
            
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


            //creating off-set columns to be appended on the left and right.
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

//Searches on page load, based on current location.
eventSearch();


//function to be ran on submit click
    $("#locSub").on("click", function(event){
        event.preventDefault();
        city = $("#inputCity").val();
        state = $("#inputState").val();
        eventType = "";
        // eventType = $("#event-type-input").val();
        $("#eventRow").html("");
        eventSearch();
        
    });

//function to run when filtering on the event page
    $(".eventFilters").on("click", function(){
        
        //filter
        eventType = $(this).data("value");
        $("#eventRow").empty();
        eventSearch();
    });

});



