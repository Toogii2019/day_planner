$(document).ready(function() {
    console.log(moment());
    const today = moment().format("LL");
    $("#currentDay").text(today);
    updateClock();


    var businessTimeArray = ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6:00 PM"];
    var timeOfTheDay = moment()

    function displayTimeBlocks () {
        businessTimeArray.forEach(function(time,i) {
            
            var rowDiv = $("<div>");
            rowDiv.attr("class", "row hour");
            var textArea = $("<textarea>");
            // if (dateReal > dateOnCalendar) {
            //     textArea.attr("class", "time-block past");
            // }
            // else if (dateReal < dateOnCalendar) {
            //     textArea.attr("class", "time-block future"); 
            // }
            var saveButton = $("<button>");
            saveButton.attr("class", "saveBtn");
            saveButton.text("Save");
            // var timeDesc = $("div").attr("class", "timeDesc");
            // timeDesc.text(timeOfTheDay.hour(9+i).minutes(0).format("LT"));
            // rowDiv.append(timeDesc);
            var rowText = $("<div>");
            rowText.text(timeOfTheDay.hour(9+i).format("h A"));
            rowText.attr("class", "rowtext");
            rowDiv.append(rowText);
            rowDiv.append(textArea);
            rowDiv.append(saveButton);
            $(".container").append(rowDiv);
        })

    }

    function updateClock() {
        $(".clock").text(moment().format("hh:mm:ss A"));
        $("#currentDay").text(moment().format("LL"));
    }

    setInterval(updateClock, 1000);

    displayTimeBlocks();

})