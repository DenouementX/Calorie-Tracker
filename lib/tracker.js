
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1; // Months from 1-12
        var year = currentDate.getFullYear();
        var newdate = year + "-" + month + "-" + day;
        dateArray.push(newdate);
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

export function getAllTrackerIds() {
    var startDate = new Date(2023, 0, 1); // January 1st, 2023
    var today = new Date();
    var dateRange = getDates(startDate,today)
    return dateRange.map((date) => {
        return {
          params: {
            id: date
          },
        };
    });
}
