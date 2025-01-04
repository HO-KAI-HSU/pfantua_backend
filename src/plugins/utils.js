window.utils = {};
window.utils.deepSet = function (obj, value, path) {
    var i;
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    obj[path[i]] = value;
}

window.utils.deepGet = function (obj, path) {
    var i;
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    return obj[path[i]];
}

window.utils.toMmSs = function (value) {
    if (value == null || value == undefined) return "--:--:--";
    return new Date(value * 1000).toISOString().substr(11, 8).replace(/^(\d{2}):(\d{2}):(\d{2})$/g, "$1時$2分$3秒").replaceAll(/00./g, '');
}

window.utils.toHhMmSs = function (value) {
    var secs = padLeft((Math.floor(value % 60)), 2);
    var mins = padLeft(Math.floor((value / 60) != 0 ? (value / 60) % 60 : 0), 2);
    var hours = Math.floor(value / 3600);

    var transferTime = hours != 0 ? 
        hours + ":" + mins + ":" + secs :   
        mins != 0 ? "00:" + mins + ":" + secs : 
        "00:00:" + secs;
    
    return transferTime;
}

function padLeft(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}