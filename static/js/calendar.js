function goToCalendar() {
    $(".container").empty();

    let calendarAppDiv = $("<div>");
    calendarAppDiv.attr("id", "calendar-app");
    var firstDay = moment($("#currentDay").text()).startOf('month');
    var closestWeekend = moment($("#currentDay").text()).startOf('month').day(-1);
    var lastDay = moment($("#currentDay").text()).endOf('month');
    console.log(firstDay);
    console.log(lastDay);
    console.log(closestWeekend);
    console.log($("#currentDay").text());
    $(".container").append(calendarAppDiv);
    $("#currentDay").text(moment($("#currentDay").text()).format("MMM YYYY"));
    var signal = buildCalendar();
    if (signal == "Escape") {
        return;
    }
    changeMonthBackground();

    function buildCalendar() {
        // let firstDay = moment($("#currentDay").text()).startOf('month');
        // let closestWeekend = moment($("#currentDay").text()).startOf('month').day(-1);
        // let lastDay = moment($("#currentDay").text()).endOf('month');
        // let firstDay = moment($("#currentDay").text()).day(3);
        // let closestWeekend = moment($("#currentDay").text()).day(0);
        // let lastDay = moment($("#currentDay").text()).day(30);
        let gap = firstDay.diff(closestWeekend, 'days');
        console.log(firstDay);
        console.log(lastDay);
        console.log($("#currentDay").text());
        if (firstDay === "Invalid date" || lastDay === "Invalid date") {
            return "Escape";
        }
        // console.log(moment())
        // console.log(firstDay.format());
        // console.log(closestWeekend.format());
        // console.log(gap);
        if (gap < 7) {
            for (i=0;i<gap;i++) {
                calendarAppDiv.append(`<div class='day past-month' data-date='past-month'>${closestWeekend.format("ddd DD")}</div>`);
                closestWeekend.add(1, 'day');
            }
        }
        var activity;
        while (!firstDay.isAfter(lastDay)) {
            let day = firstDay.format("D");
            let month = firstDay.format("MMMM");
            let year = firstDay.format("YYYY");
            let dateChosen = month + " " + day + "," + " " + year;
            // console.log(dateChosen);
            for (index=0;index<10;index++) {
                if (localStorage.getItem(dateChosen + "-" + index)) {
                    activity = "<br><strong style='color: red;'>Note Exist</strong>";
                    // console.log(dateChosen + "-" + index);
                    // console.log(localStorage.getItem(dateChosen + "-" + index));
                    break;
                }
                else {
                    activity = "";
                }
            }
            if (isWeekend(dateChosen)) {
                calendarAppDiv.append(`<div class="day weekend">${firstDay.format("ddd DD")} ${activity}</div>`);
            }
            else if (isFutureDay(dateChosen)) {
                calendarAppDiv.append(`<div class="day future">${firstDay.format("ddd DD")} ${activity}</div>`);
            }
            else if (isPresentDay(dateChosen)) {
                calendarAppDiv.append(`<div class="day present">${firstDay.format("ddd DD")} ${activity}</div>`);
            }
            else if (isPastDay(dateChosen)) {
                calendarAppDiv.append(`<div class="day past">${firstDay.format("ddd DD")} ${activity}</div>`);
            }
            else {
                calendarAppDiv.append(`<div class="day">${firstDay.format("ddd DD")} ${activity}</div>`);
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

