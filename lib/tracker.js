
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

// Converts Date() object into format YYYY-MM-DD for our app to use
export function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months from 1-12
    var year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

// Converts a YYYY-MM-DD string into Month Day, Year format
export function getDisplayDate(date) {
    var hyphens = []
    for (let i = 0; i < date.length; i++) {
        if (date[i] === ("-")) {
            hyphens.push(i);
        }
    }
    var day = date.substring(hyphens[1] + 1);
    var month = date.substring(hyphens[0] + 1, hyphens[1]);
    var year = date.substring(0, hyphens[0]);
    const months = ["", "January","February","March","April","May","June","July","August","September","October","November","December"];
    return months[month] + " " + day + ", " + year;
}