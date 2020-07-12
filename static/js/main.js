$(document).ready(function() {
    console.log(moment());
    var m = moment();
    $("#currentDay").text(moment().format("LL"));
 
    function getCurrentDate() {
        m = moment();
        console.log(m.format("LLL"))
        return m.format("LLL");
    }

    function getCurrentTime() {
        m = moment().format("LLL");
        return m
    }

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
            // var timeDesc = $("div").attr("class", "timeDesc");
            // timeDesc.text(timeOfTheDay.hour(9+i).minutes(0).format("LT"));
            // rowDiv.append(timeDesc);
            var rowText = $("<div>");
            rowText.text(timeOfTheDay.hour(9+i).minutes(0).format("H A"));
            rowText.attr("class", "rowtext");
            rowDiv.append(rowText);
            rowDiv.append(textArea);
            rowDiv.append(saveButton);
            $(".container").append(rowDiv);
        })

    }
    displayTimeBlocks();

})