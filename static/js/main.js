$(document).ready(showDates(moment().format("LL")));

function showDates (today) {
    $("#currentDay").text(today);
    var dateMoveIndex = moment(today).diff(moment(), 'day');
    var monthMoveIndex = moment(today).diff(moment(), 'month');
    var presentHour;
    var presentActivity;
    changeBackgroundOfTheDateHeader();
    function changeBackgroundOfTheDateHeader() {
        let dateObj = $("#currentDay").text();
        if (isWeekend(dateObj)) {
            $("#currentDay").attr("class", "weekend");
            return;
        }
        if (isPresentDay(dateObj)) {
            $("#currentDay").attr("class", "present");
        }
        else if (isPastDay(dateObj)) {
            $("#currentDay").attr("class", "past");
        }
        else {
            $("#currentDay").attr("class", "future");
        }
    }

    function moveDateBackward() {
        if ($("#currentDay").text().split(" ").length === 2) {
            console.log($("#currentDay").text().split(" ").length)
            monthMoveIndex--;
            $("#currentDay").text(moment().add(monthMoveIndex, 'months').format("LL"));
            goToCalendar();
            return;
        }
        dateMoveIndex --;
        $("#currentDay").text(moment().add(dateMoveIndex, 'days').format("LL"));
        changeBackgroundOfTheDateHeader();
        displayTimeBlocks();
        $(".saveBtn").on("click", function(event) {
            let textId = event.target.value;
            let textContent = document.getElementById(textId).value;
            let calendarDay = moment($("#currentDay").text()).format("LL");
            updateStorage(calendarDay, textId, textContent);
        })
    
    }
    function moveDateForward() {
        if ($("#currentDay").text().split(" ").length === 2) {
            console.log($("#currentDay").text().split(" ").length)
            monthMoveIndex++;
            $("#currentDay").text(moment().add(monthMoveIndex, 'months').format("LL"));
            goToCalendar();
            return;
        }
        dateMoveIndex ++;
        $("#currentDay").text(moment().add(dateMoveIndex, 'days').format("LL"));   
        changeBackgroundOfTheDateHeader();
        displayTimeBlocks();
        $(".saveBtn").on("click", function(event) {
            var textId = event.target.value;
            var textContent = document.getElementById(textId).value;
            var calendarDay = moment($("#currentDay").text()).format("LL");
            updateStorage(calendarDay, textId, textContent);
        })
    }

    function updateTextAreas(index) {
        let calendarDay = moment($("#currentDay").text()).format("LL");
        var textArea = document.getElementById(i);
        textArea.value = localStorage.getItem(calendarDay + "-" + index);
        if (presentHour - 9 === i) {
            presentActivity = textArea.value;
        }
    }

    function updateStorage(date, textId, textContent) {
        let dateObj = $("#currentDay").text();
        if (isWeekend(dateObj)) {
            return;
        }
        localStorage.setItem(date + "-" + textId, textContent);
        displayTimeBlocks();
    }


    function hideAlert(autoSaveAlert) {
        var alertInterval = setTimeout(function() {
            autoSaveAlert.setAttribute("class", "alert alert-success alert-dismissible fade")
            clearInterval(alertInterval);
            
        }, 1500);
    }

    function displayAlert(saveMsg) {
        var autoSaveAlert = document.getElementById("saveAlert");
        autoSaveAlert.textContent = saveMsg;
        autoSaveAlert.setAttribute("class", "alert alert-success alert-dismissible show fade");
        hideAlert(autoSaveAlert);
    }


    function autoSave() {
        let calendarDay = moment($("#currentDay").text()).format("LL");
        displayAlert("Autosaving");
        for (i=0;i<10;i++) {
            let textArea = document.getElementById(i);
            updateStorage(calendarDay, i, textArea.value);
        }
        displayTimeBlocks();
    }

    function displayTimeBlocks () {
        if ($(".row").length === 0) {

            $(".container").empty();

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
        for (i=0;i<10;i++) {
            let textArea = document.getElementById(i);
            let dateObj = $("#currentDay").text();
            if (isWeekend(dateObj)) {
                textArea.setAttribute("class","time-block weekend");
                textArea.value = "Weekend";
                textArea.disabled = true;
                continue;
            } 
            textArea.disabled = false;
            if (isFutureDay(dateObj)) {
                textArea.setAttribute("class","time-block future");
                updateTextAreas(i);
                continue;
            }
            
            else if (isPresentDay(dateObj)) {
                if (isPresentHour(i)) {
                    textArea.setAttribute("class","time-block present");
                    presentHour = 9+i;
                }
                else if (isFutureHour(i)) {
                    textArea.setAttribute("class","time-block future");
                }
                else if (isPastHour(i)) { 
                    textArea.setAttribute("class","time-block past");
                }
            }
            else if (isPastDay(dateObj)) {
                textArea.setAttribute("class","time-block past");
            }
            updateTextAreas(i);
        }
        
    }

    function updateClock() {
        $(".clock").text(moment().format("LTS"));
        $(".date").text(moment().format("dddd DD MMMM YYYY"));
        // $("#currentDay").text(moment().format("LL"));
    }
    updateClock();
    var clockInTheHeader = setInterval(updateClock, 1000);
    // var timeBlockRefresh = setInterval(displayTimeBlocks, 60000);
    displayTimeBlocks();

    $(".left-button").on("click", moveDateBackward);
    $(".right-button").on("click", moveDateForward);

    $(".saveBtn").on("click", function(event) {
        displayAlert("Saved Successfully");
        var textId = event.target.value;
        var textContent = document.getElementById(textId).value;
        var calendarDay = moment($("#currentDay").text()).format("LL");
        updateStorage(calendarDay, textId, textContent);
    })
}


function goToCalendar() {
    $(".container").empty();
    let calendarAppDiv = $("<div>");
    calendarAppDiv.attr("id", "calendar-app");
    $(".container").append(calendarAppDiv);
    $("#currentDay").text(moment($("#currentDay").text()).format("MMM YYYY"));
    buildCalendar();
    changeMonthBackground();

function buildCalendar() {
    let firstDay = moment($("#currentDay").text()).startOf('month');
    let closestWeekend = moment($("#currentDay").text()).startOf('month').day(-1);
    let lastDay = moment($("#currentDay").text()).endOf('month');
    let gap = firstDay.diff(closestWeekend, 'days');
    console.log(firstDay.format());
    console.log(closestWeekend.format());
    console.log(gap);
    if (gap < 7) {
        for (i=0;i<gap;i++) {
            calendarAppDiv.append(`<div class='day past-month' data-date='past-month'>${closestWeekend.format("ddd DD")}</div>`);
            closestWeekend.add(1, 'day');
        }
    }
    while (!firstDay.isAfter(lastDay)) {
        let day = firstDay.format("DD");
        let month = firstDay.format("MMMM");
        let year = firstDay.format("YYYY");
        let dateChosen = month + " " + day + "," + " " + year;

        if (isWeekend(dateChosen)) {
            calendarAppDiv.append(`<div class="day weekend">${firstDay.format("ddd DD")}</div>`);
        }
        else if (isFutureDay(dateChosen)) {
            calendarAppDiv.append(`<div class="day future">${firstDay.format("ddd DD")}</div>`);
        }
        else if (isPresentDay(dateChosen)) {
            calendarAppDiv.append(`<div class="day present">${firstDay.format("ddd DD")}</div>`);
        }
        else if (isPastDay(dateChosen)) {
            calendarAppDiv.append(`<div class="day past">${firstDay.format("ddd DD")}</div>`);
        }
        else {
            calendarAppDiv.append(`<div class="day">${firstDay.format("ddd DD")}</div>`);
        }
        firstDay.add(1, 'day');
    }
}
function jumpToDate(event) {
    console.log(event.target.getAttribute("data-date"));
    if (event.target.getAttribute("data-date") == "past-month") {
        return;
    }
    let day = event.target.textContent.split(" ")[1];
    let month = $("#currentDay").text().split(" ")[0];
    let year = $("#currentDay").text().split(" ")[1];
    let dateChosen = month + " " + day + "," + " " + year;
    let date = moment(dateChosen);
    showDates(date.format("LL"));

}
$(".day").on("click", jumpToDate)

function changeMonthBackground() {
    if (isPresentMonth()) {
        $("#currentDay").attr("class", "present");
    }
    else if (isPastMonth()) {
        $("#currentDay").attr("class", "past");
    }
    else {
        $("#currentDay").attr("class", "future");
    }
}

}