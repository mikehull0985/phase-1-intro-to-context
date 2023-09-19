
function createEmployeeRecord(employeeRecordObj) {
    let obj = {
        firstName: employeeRecordObj[0],
        familyName: employeeRecordObj[1],
        title: employeeRecordObj[2],
        payPerHour: employeeRecordObj[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

function createEmployeeRecords(employeesArray) {
    let newArray = []
    for (const employee of employeesArray) {
        const newObj = createEmployeeRecord(employee)
        newArray.push(newObj)
    }
    return newArray
}

function createTimeInEvent(employeeRecordObj, dateStamp) {
    let hour = dateStamp.substring(11)
    hour = parseInt(hour, 10)
    const date = dateStamp.substring(0,10)
    let obj = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    const array = employeeRecordObj.timeInEvents
    array.push(obj)
    return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, dateStamp) {
    let hour = dateStamp.substring(11)
    hour = parseInt(hour, 10)
    const date = dateStamp.substring(0,10)
    let obj = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    const array = employeeRecordObj.timeOutEvents
    array.push(obj)
    return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, date) {
    const timeInArray = employeeRecordObj.timeInEvents
    const correctObjTimeIn = timeInArray.find((obj) => obj.date === date)
    const punchIn = correctObjTimeIn.hour

    const timeOutArray = employeeRecordObj.timeOutEvents
    const correctObjTimeOut = timeOutArray.find((obj) => obj.date === date)
    const punchOut = correctObjTimeOut.hour

    const hoursWorked = (punchOut - punchIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecordObj, date) {
   const hours = hoursWorkedOnDate(employeeRecordObj, date)

   const rate = employeeRecordObj.payPerHour
   const wage = rate * hours

   return wage
}

function allWagesFor(employeeRecordObj) {
    const timeInArray = employeeRecordObj.timeInEvents
    let array = []
    for (const obj of timeInArray) {
        let date = obj.date
        const wage = wagesEarnedOnDate(employeeRecordObj, date)
        array.push(wage)
    }
    const total = array.reduce(function(accumulator, currentWage) {
       return accumulator + currentWage
    })
    return total
}

function calculatePayroll(arrayOfEmployeeRecordObjs) {
    let array = []
    for (const obj of arrayOfEmployeeRecordObjs) {
        const employeeTotal = allWagesFor(obj)
        array.push(employeeTotal)
    }
    const staffTotal = array.reduce(function(accumulator, currentTotal) {
        return accumulator + currentTotal
        })
    return staffTotal
}