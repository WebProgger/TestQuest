export const formatDateTime = (date) => {
    date = new Date(date);
    let year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), hour = date.getHours(), min = date.getMinutes();
    if(year < 10) year = '0' + year;
    if(month < 10) month = '0' + month;
    if(day < 10) day = '0' + day;
    if(hour < 10) hour = '0' + hour;
    if(min < 10) min = '0' + min;
    return year + '.' + month + '.' + day + ' ' + hour + ':' + min; 
}