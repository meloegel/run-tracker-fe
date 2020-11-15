
const formatHour = (hour, min) => {
    if (hour >= 13) {
        var newHour = hour - 12
        return (`${newHour}:${min} PM`)
    } else {
        return (`${hour}:${min} AM`)
    }
}

const FormatDateTime = (dateTime) => {
    // Formats Date //
    var date_time = dateTime.split(" ")
    var dateUnformat = date_time[0]
    var dates = dateUnformat.split('-')
    var year = dates[0]
    var month = dates[1]
    var day = dates[2]


    // Formats Time //
    var time = date_time[1]
    var timeUnformat = time.split(':')
    var hour = timeUnformat[0]
    var min = timeUnformat[1]
    // var sec = timeUnformat[2]

    return (`${formatHour(hour, min)} ${month}-${day}-${year}`)
}

export default FormatDateTime;