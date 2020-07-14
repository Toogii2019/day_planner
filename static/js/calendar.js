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
        let lastDay = moment($("#currentDay").text()).endOf('month');
        while (!firstDay.isAfter(lastDay)) {
            calendar.insertAdjacentHTML("beforeend", `<div class="day">${firstDay.format("ddd DD")}</div>`);
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

