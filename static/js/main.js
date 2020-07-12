$(document).ready(function() {
    console.log(moment());
    const today = moment().format("LL");
    $("#currentDay").text(moment().format("LL"));
    var dateMoveIndex = 0;

    function changeBackgroundOfTheDateHeader() {
        if (moment($("#currentDay").text()).isSame(moment().format("MMMM DD YYYY"))) {
            console.log("Today");
            $("#currentDay").attr("class", "present");
        }
        else if (moment($("#currentDay").text()).isBefore(moment().format("MMMM DD YYYY"))) {
            $("#currentDay").attr("class", "past");
        }
        else {
            $("#currentDay").attr("class", "future");
        }
    }

    function moveDateBackward() {
        console.log("moving back");
        dateMoveIndex --;
        $("#currentDay").text(moment().add(dateMoveIndex, 'days').format("LL"));
        changeBackgroundOfTheDateHeader();
    
    }
    function moveDateForward() {
        dateMoveIndex ++;
        $("#currentDay").text(moment().add(dateMoveIndex, 'days').format("LL"));   
        changeBackgroundOfTheDateHeader();

    }
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
        // $("#currentDay").text(moment().format("LL"));
    }
    updateClock();
    var clockInTheHeader = setInterval(updateClock, 1000);
    var timeBlockRefresh = setInterval(displayTimeBlocks, 60000);
    displayTimeBlocks();

    $(".left-button").on("click", moveDateBackward);
    $(".right-button").on("click", moveDateForward);





})