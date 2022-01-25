function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}
//let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])

function createEmployeeRecords(recordsArray) {
    return recordsArray.map(record => createEmployeeRecord(record));
}


let createTimeInEvent = function(employee, dateStamp) {
    //let [date, hour] = dateStamp.split(' '); //ES6 - same as below 
    const arrFromDate = dateStamp.split(" ");
    const date = arrFromDate[0];
    const hour = arrFromDate[1]
    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10), 
        date: date
    }

    employee.timeInEvents.push(inEvent);

    return employee;
}

let createTimeOutEvent = function (employee, dateStamp) {
    let timeFromArr = dateStamp.split(' ');
    let date = timeFromArr[0];
    let hour = timeFromArr[1];
    const outEvent = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date,
    }

    employee.timeOutEvents.push(outEvent);

    return employee;

}

// createTimeOutEvent(testEmployee, "2015-02-28 1700"); // => log the object with employee info and time out 


//Behavior: Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent 
//Working note: .find() 
let hoursWorkedOnDate = function (employee, date) {
    let inEvemt = employee.timeInEvents.find(function(e) {
        return e.date === date;
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === date;
    })

    return (outEvent.hour - inEvemt.hour) / 100;

}


//cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
//updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
//updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

let wagesEarnedOnDate = function (employee, date) {
    let earning = hoursWorkedOnDate(employee, date) * employee.payPerHour;
    return earning;
}

let allWagesFor = function (employee) {
    let dates = employee.timeInEvents.map(e => e.date);
    let sumOfWages = dates.reduce( (timesheet, date) => timesheet + wagesEarnedOnDate(employee, date), 0); 
    return sumOfWages
}

let calculatePayroll = function (employeeRecordsArr) {
    return employeeRecordsArr.reduce((timesheet, employeeRecord) => timesheet + allWagesFor(employeeRecord), 0);   
}