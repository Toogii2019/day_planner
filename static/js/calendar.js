function goToCalendar() {
    console.log("Going to calendar");
    $(".container").empty();

    let calendarAppDiv = $("<div>");
    calendarAppDiv.attr("id", "calendar-app");
    $(".container").append(calendarAppDiv);

    const isWeekend = day => {
        return true;
    }

    const calendar = document.querySelector("#calendar-app");
    console.log(calendar);
    for (day=1;day<31;day++) {
        isWeekend(day);
        calendar.insertAdjacentHTML("beforeend", `<div class="day">${day}</div>`);
    }
  

}