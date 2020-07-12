$(document).ready(function() {
    console.log(moment());
    const today = moment().format("LL");
    $("#currentDay").text(today);
    
    function checkActivity() {
        console.log("Focusing")
    }

    var businessTimeArray = ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6:00 PM"];
    var timeOfTheDay = moment()

    function displayTimeBlocks () {
        $(".container").empty();
        console.log(moment());

        for (i=0;i<10;i++) {
            var rowDiv = $("<div>");
            rowDiv.attr("class", "row hour");
            var textArea = $("<textarea>");
            // textArea.attr("onfocus", "function() test {console.log('focusing')}");
            if (moment().isBefore(moment().hour(9+i))) {
                textArea.attr("class","time-block future");
            }
            else if (moment().isSame(moment().hour(9+i))) {
                textArea.attr("class","time-block present");
            }
            else {
                textArea.attr("class","time-block past");

            }
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
            rowText.text(moment().hour(9+i).format("h A"));
            rowText.attr("class", "rowtext");
            rowDiv.append(rowText);
            rowDiv.append(textArea);
            rowDiv.append(saveButton);
            $(".container").append(rowDiv);
        }

    }

    function updateClock() {
        $(".clock").text(moment().format("dddd") + " " + moment().format("LL") + " " + moment().format("LTS"));
        $("#currentDay").text(moment().format("LL"));
    }
    updateClock();
    var clockInTheHeader = setInterval(updateClock, 1000);
    // var timeBlockRefresh = setInterval(displayTimeBlocks, 1000);
    displayTimeBlocks();







})