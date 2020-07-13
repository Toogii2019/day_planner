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
        displayTimeBlocks();
        $(".saveBtn").on("click", function(event) {
            console.log(event.target.value);
            var textId = event.target.value;
            var textContent = document.getElementById(textId).value;
            console.log(textContent);
            var calendarDay = moment($("#currentDay").text()).format("LL");
            updateStorage(calendarDay, textId, textContent);
        })
    
    }
    
    function updateTextAreas() {
        var calendarDay = moment($("#currentDay").text()).format("LL");
        for (i=0;i<10;i++) {
            var textArea = document.getElementById(i);
            textArea.textContent = localStorage.getItem(calendarDay + "-" + i);
        }
    }

    function updateStorage(date, textId, textContent) {
        console.log(textId);
        localStorage.setItem(date + "-" + textId, textContent);
    }

    function moveDateForward() {
        dateMoveIndex ++;
        $("#currentDay").text(moment().add(dateMoveIndex, 'days').format("LL"));   
        changeBackgroundOfTheDateHeader();
        displayTimeBlocks();
        $(".saveBtn").on("click", function(event) {
            console.log(event.target.value);
            var textId = event.target.value;
            var textContent = document.getElementById(textId).value;
            console.log(textContent);
            var calendarDay = moment($("#currentDay").text()).format("LL");
            updateStorage(calendarDay, textId, textContent);
        })
        

    }
    function displayTimeBlocks () {
        $(".container").empty();
        console.log(moment());

        for (i=0;i<10;i++) {
            var rowDiv = $("<div>");
            rowDiv.attr("class", "row hour");
            // rowDiv.attr();
            var textArea = $("<textarea>");
            textArea.attr("id", i);
            // textArea.attr("onfocus", "function() test {console.log('focusing')}");
            if (moment().isBefore(moment($("#currentDay").text()).hour(9+i))) {
                console.log("Before")
                textArea.attr("class","time-block future");
            }
            else if (moment().isSame(moment($("#currentDay").text()).hour(9+i))) {
                textArea.attr("class","time-block present");
                console.log("Same")
            }
            else {
                textArea.attr("class","time-block past");
                console.log("After")
            }

            var saveButton = $("<button>");
            saveButton.attr("class", "saveBtn glyphicon glyphicon-floppy-disk");
            saveButton.attr("value", i);
            saveButton.text("Save");

            // var timeDesc = $("div").attr("class", "timeDesc");
            // timeDesc.text(timeOfTheDay.hour(9+i).minutes(0).format("LT"));
            // rowDiv.append(timeDesc);
            var rowText = $("<div>");
            rowText.text(moment().hour(9+i).format("hA"));
            rowText.attr("class", "rowtext");
            rowDiv.append(rowText);
            rowDiv.append(textArea);
            rowDiv.append(saveButton);
            $(".container").append(rowDiv);
        }
        updateTextAreas();
    }

    function updateClock() {
        $(".clock").text(moment().format("dddd") + " " + moment().format("LL") + " " + moment().format("LTS"));
        // $("#currentDay").text(moment().format("LL"));
    }
    updateClock();
    var clockInTheHeader = setInterval(updateClock, 1000);
    // var timeBlockRefresh = setInterval(displayTimeBlocks, 60000);
    displayTimeBlocks();

    $(".left-button").on("click", moveDateBackward);
    $(".right-button").on("click", moveDateForward);

    $(".saveBtn").on("click", function(event) {
        console.log(event.target.value);
        var textId = event.target.value;
        var textContent = document.getElementById(textId).value;
        console.log(textContent);
        var calendarDay = moment($("#currentDay").text()).format("LL");
        updateStorage(calendarDay, textId, textContent);

    })

})