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
    
    function updateTextAreas(index) {
        var calendarDay = moment($("#currentDay").text()).format("LL");
        console.log("Updating text areas");
        var textArea = document.getElementById(i);
        
        textArea.value = localStorage.getItem(calendarDay + "-" + index);
    }

    function updateStorage(date, textId, textContent) {
        console.log(textId);
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

    function displayAlert() {
        var autoSaveAlert = document.getElementById("saveAlert");
        autoSaveAlert.setAttribute("class", "alert alert-success alert-dismissible show fade");
        hideAlert(autoSaveAlert);
    }

    function autoSave() {
        let calendarDay = moment($("#currentDay").text()).format("LL");
        console.log("Autosaving");
        displayAlert();
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
            if (moment().isBefore(moment($("#currentDay").text()).hour(9+i))) {
                console.log("Before")
                textArea.setAttribute("class","time-block future");
            }
            else if (moment().isSame(moment($("#currentDay").text()).hour(9+i))) {
                textArea.setAttribute("class","time-block present");
                console.log("Same")
            }
            else {
                textArea.setAttribute("class","time-block past");
                console.log("After")
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
        console.log(event.target.value);
        var textId = event.target.value;
        var textContent = document.getElementById(textId).value;
        console.log(textContent);
        var calendarDay = moment($("#currentDay").text()).format("LL");
        updateStorage(calendarDay, textId, textContent);

    })

})