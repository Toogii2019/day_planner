function goToCalendar() {
    $(".container").empty();

    let calendarAppDiv = $("<div>");
    calendarAppDiv.attr("id", "calendar-app");
    $(".container").append(calendarAppDiv);
    console.log("This is what I found - ", $("#currentDay").text());

    $("#currentDay").text(moment($("#currentDay").text()).format("MMM YYYY"));
    console.log("This is what I found - ", $("#currentDay").text());
    // const isWeekend = day => {
    //     return true;
    // }

    const calendar = document.querySelector("#calendar-app");
    
    buildCalendar();

    function buildCalendar() {
        let firstDay = moment($("#currentDay")).startOf('month');
        let lastDay = moment($("#currentDay")).endOf('month');
        while (!firstDay.isAfter(lastDay)) {
            const weekend = isWeekend();
            calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""}">${firstDay.format("ddd DD")}</div>`);
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

}

