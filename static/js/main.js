$(document).ready(function() {
    console.log(moment());
    const today = moment().format("LL");
    $("#currentDay").text(moment().format("LL"));
    var dateMoveIndex = 0;
    function changeBackgroundOfTheDateHeader() {
        if (isWeekend()) {
            $("#currentDay").attr("class", "weekend");
            return;
        }
        if (isPresentDay()) {
            console.log("Today");
            $("#currentDay").attr("class", "present");
        }
        else if (isPastDay()) {
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
            let textId = event.target.value;
            let textContent = document.getElementById(textId).value;
            console.log(textContent);
            let calendarDay = moment($("#currentDay").text()).format("LL");
            updateStorage(calendarDay, textId, textContent);
        })
    
    }
    
    function updateTextAreas(index) {
        let calendarDay = moment($("#currentDay").text()).format("LL");
        console.log("Updating text areas");
        var textArea = document.getElementById(i);
        
        textArea.value = localStorage.getItem(calendarDay + "-" + index);
    }

    function updateStorage(date, textId, textContent) {
        console.log(textId);
        if (isWeekend()) {
            return;
        }
        localStorage.setItem(date + "-" + textId, textContent);
        displayTimeBlocks();
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

    function hideAlert(autoSaveAlert) {
        var alertInterval = setTimeout(function() {
            autoSaveAlert.setAttribute("class", "alert alert-success alert-dismissible fade")
            clearInterval(alertInterval);
            
        }, 1500);
    }

    function displayAlert(saveMsg) {
        console.log(saveMsg);
        var autoSaveAlert = document.getElementById("saveAlert");
        autoSaveAlert.textContent = saveMsg;
        autoSaveAlert.setAttribute("class", "alert alert-success alert-dismissible show fade");
        hideAlert(autoSaveAlert);
    }


    function autoSave() {
        let calendarDay = moment($("#currentDay").text()).format("LL");
        console.log("Autosaving");
        displayAlert("Autosaving");
        for (i=0;i<10;i++) {
            let textArea = document.getElementById(i);
            updateStorage(calendarDay, i, textArea.value);
        }
        displayTimeBlocks();
    }

    function displayTimeBlocks () {
        if ($(".row").length === 0) {
            console.log("Creating");

            $(".container").empty();
            console.log(moment());

            for (i=0;i<10;i++) {
                var rowDiv = $("<div>");
                rowDiv.attr("class", "row hour");
                var textArea = $("<textarea>");
                textArea.attr("id", i);
        

                var saveButton = $("<button>");
                saveButton.attr("class", "saveBtn glyphicon glyphicon-floppy-disk");
                saveButton.attr("value", i);
                saveButton.text("Save");

                var rowText = $("<div>");
                rowText.text(moment().hour(9+i).format("hA"));
                rowText.attr("class", "rowtext");
                rowDiv.append(rowText);
                rowDiv.append(textArea);
                rowDiv.append(saveButton);
                $(".container").append(rowDiv);
            }
        }
        console.log("Painting")
        for (i=0;i<10;i++) {
            let textArea = document.getElementById(i);
            if (isWeekend()) {
                textArea.setAttribute("class","time-block weekend");
                textArea.value = "Weekend";
                textArea.disabled = true;
                continue;
            } 
            textArea.disabled = false;
            if (isFutureDay()) {
                textArea.setAttribute("class","time-block future");
                updateTextAreas(i);
                continue;
            }
            
            else if (isPresentDay()) {
                if (isPresentHour(i)) {
                    textArea.setAttribute("class","time-block present");
                }
                else if (isFutureHour(i)) {
                    textArea.setAttribute("class","time-block future");
                    console.log("Same")
                }
                else if (isPastHour(i)) { 
                    textArea.setAttribute("class","time-block past");
                }
            }
            else if (isPastDay()) {
                textArea.setAttribute("class","time-block past");
            }
            updateTextAreas(i);
        }
        
    }

    function updateClock() {
        $(".clock").text(moment().format("dddd") + " " + moment().format("LL") + " " + moment().format("LTS"));
        // $("#currentDay").text(moment().format("LL"));
    }
    updateClock();
    var clockInTheHeader = setInterval(updateClock, 1000);
    var timeBlockRefresh = setInterval(autoSave, 60000);
    displayTimeBlocks();

    $(".left-button").on("click", moveDateBackward);
    $(".right-button").on("click", moveDateForward);

    $(".saveBtn").on("click", function(event) {
        displayAlert("Saved Successfully");
        console.log(event.target.value);
        var textId = event.target.value;
        var textContent = document.getElementById(textId).value;
        console.log(textContent);
        var calendarDay = moment($("#currentDay").text()).format("LL");
        updateStorage(calendarDay, textId, textContent);
    })
})