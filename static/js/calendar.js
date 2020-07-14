function goToCalendar() {
    $(".container").empty();

    let calendarAppDiv = $("<div>");
    calendarAppDiv.attr("id", "calendar-app");
    $(".container").append(calendarAppDiv);
    $("#currentDay").text(moment($("#currentDay").text()).format("MMM YYYY"));
    const calendar = document.querySelector("#calendar-app");
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
                calendar.insertAdjacentHTML("beforeend", `<div class="day past-month">${closestWeekend.format("ddd DD")}</div>`);
                closestWeekend.add(1, 'day');
            }
        }
        while (!firstDay.isAfter(lastDay)) {
            let day = firstDay.format("DD");
            let month = firstDay.format("MMMM");
            let year = firstDay.format("YYYY");
            let dateChosen = month + " " + day + "," + " " + year;

            if (isWeekend(dateChosen)) {
                calendar.insertAdjacentHTML("beforeend", `<div class="day weekend">${firstDay.format("ddd DD")}</div>`);
            }
            else if (isFutureDay(dateChosen)) {
                calendar.insertAdjacentHTML("beforeend", `<div class="day future">${firstDay.format("ddd DD")}</div>`);
            }
            else if (isPresentDay(dateChosen)) {
                calendar.insertAdjacentHTML("beforeend", `<div class="day present">${firstDay.format("ddd DD")}</div>`);
            }
            else if (isPastDay(dateChosen)) {
                calendar.insertAdjacentHTML("beforeend", `<div class="day past">${firstDay.format("ddd DD")}</div>`);
            }
            else {
                calendar.insertAdjacentHTML("beforeend", `<div class="day">${firstDay.format("ddd DD")}</div>`);
            }
            firstDay.add(1, 'day');
        }
    }
    function jumpToDate(event) {
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

