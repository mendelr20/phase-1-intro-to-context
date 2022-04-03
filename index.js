function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }    
}

function createEmployeeRecords(records){
    const employeeRecords = []
    records.forEach(record => {
        const employee = createEmployeeRecord(record)
        employeeRecords.push(employee)
    });
    return employeeRecords
}

function createTimeInEvent(employeeRecord, dateStamp){
    const date = dateStamp.slice(0, 10).split()
    const time = dateStamp.slice(11).split()
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date[0],
        hour: parseInt(time[0])
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const date = dateStamp.slice(0, 10).split()
    const time = dateStamp.slice(11).split()
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: date[0],
        hour: parseInt(time[0])
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord){
    return (employeeRecord.timeOutEvents[0].hour - employeeRecord.timeInEvents[0].hour) / 100
}

function wagesEarnedOnDate(employeeRecord){
    return (employeeRecord.timeOutEvents[0].hour - employeeRecord.timeInEvents[0].hour) / 100 * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    const days = employeeRecord.timeInEvents.length
    let sum = 0
    for (let i = 0; i < days; i++){
        const totalHours = (employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour) / 100
        sum = sum + (totalHours) * employeeRecord.payPerHour
    }
    return sum
}

function calculatePayroll(employeeRecord){
    let sum = 0
    for (let i = 0; i < employeeRecord.length; i++){
        sum = sum + allWagesFor(employeeRecord[i])
    }
    return sum
}
