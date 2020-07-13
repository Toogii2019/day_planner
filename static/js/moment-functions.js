function isWeekend() {
    if (moment($("#currentDay").text()).days() === 0 || moment($("#currentDay").text()).days() === 6) {
        return true;
    }
    return false;
}

function isFutureDay() {
    if (moment().isBefore(moment($("#currentDay").text()), 'day')) {
        return true;
    }
    return false;
}

function isPresentDay() {
    if (moment().isSame(moment($("#currentDay").text()), 'day')) {
        return true;
    }
    return false;
}

function isPresentHour(index) {
    if (moment().isSame(moment($("#currentDay").text()).hour(9+index), 'hour')) {
        return true;
    }
    return false;
}

function isFutureHour(index) {
    if (moment().isBefore(moment($("#currentDay").text()).hour(9+index), 'hour')) {
        return true;
    }
    return false;
}

function isPastHour(index) {
    if (moment().isAfter(moment($("#currentDay").text()).hour(9+index), 'hour')) {
        return true;
    }
    return false;
}

function isPastDay() {
    if (moment().isAfter(moment($("#currentDay").text()), 'day')) {
        return true;
    }
    return false;
}