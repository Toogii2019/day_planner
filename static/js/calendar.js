function goToCalendar() {
    console.log("Going to calendar");
    $(".container").empty();

    let calendarAppDiv = $("<div>");
    calendarAppDiv.attr("id", "calendar-app");
    $(".container").append(calendarAppDiv);
    $("#currentDay").text(moment($("#currentDay")).format("MMM YYYY"));

    // const isWeekend = day => {
    //     return true;
    // }

    const calendar = document.querySelector("#calendar-app");
    console.log(calendar);
    
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
        console.log("Done");
        let day = event.target.textContent.split(" ")[1];
        console.log(day);
        let month = $("#currentDay").text().split(" ")[0];
        console.log(month);
        let year = $("#currentDay").text().split(" ")[1];
        console.log(year);
        let dateChosen = month + " " + day + "," + " " + year;
        console.log(dateChosen);
        let date = moment(dateChosen);
        console.log(date.format("LL"));
        showDates(date.format("LL"));

    }
    $(".day").on("click", jumpToDate)

}

