import Vue from 'vue'
import moment from 'moment'

window.Filter = {};

window.Filter.commaFormat = function (value) {
    if (value) {
        return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function (all, pre, groupOf3Digital) {
            return pre + groupOf3Digital.replace(/\d{3}/g, ',$&');
        });
    } else {
        return value;
    }
}
Vue.filter('commaFormat', window.Filter.commaFormat);
Vue.filter('comma', window.Filter.commaFormat);


Vue.filter('limit', function (arr, length, include) {
    if (include) {
        length++;
    }

    if (arr && arr.length) {
        if (length == -1) {
            return arr;
        }
        if (length > arr.length) {
            return arr;
        }
        return arr.slice(0, length);
    }

    return null;
});

Vue.filter('skip', function (arr, start) {
    return arr.slice(start);
});

Vue.filter('take', function (arr, count) {
    return arr.slice(0, count);
});

Vue.filter('range', function (arr, start, count) {
    return arr.slice(start, count);
});

function padLeft(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

Vue.filter('orderid', function (value) {
    if (value && value.CreateTime && value.OrderID) {
        return moment(value.CreateTime).format('YYYYMMDD') + padLeft(value.OrderID, 6);
    } else {
        return value;
    }
});

Vue.filter('padLeft', function (value, n) {
    return padLeft(value, n);
});

window.Filter.isoDateFormat = function (value) {
    if (!value) return '';
    return moment(value).format("YYYY-MM-DD");
}

window.Filter.isoDateTimeFormat = function (value) {
    if (!value) return '';
    return moment(value).format("YYYY-MM-DDTHH:mm:ss");
}

window.Filter.dateFormat = function (value) {
    if (!value) return '';
    return moment(value).format("YYYY/MM/DD");
}

Vue.filter('dateFormat', window.Filter.dateFormat);

window.Filter.dateTimeFormat = function (value) {
    if (!value) return '';
    return moment(value).format("YYYY/MM/DD HH:mm");
}

Vue.filter('dateTimeFormat', window.Filter.dateTimeFormat);

window.Filter.imageCDN = function (value) {
    if (value) {
        if (value.indexOf('http') == 0) {
            return value;
        } else {
            return config.imgUrl + value;
        }
    } else {
        return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
    }
    return value;
};
Vue.filter('imageCDN', window.Filter.imageCDN);


const DEFAULT_HEADER_IMAGE = '/images/user_img_default_96.jpg';
window.Filter.headerImage = function (user) {
    if (!user || !user.HeaderVersion) {
        return DEFAULT_HEADER_IMAGE;
    }
    return config.imgUrl + 'header/' + user.MemberID + '.jpg?ver=' + user.HeaderVersion;
};
Vue.filter('headerImage', window.Filter.headerImage);

const DEFAULT_TOP_IMAGE = '/images/profile_background_default.jpg';
Vue.filter('topImage', function (user) {
    if (!user || !user.TopVersion) {
        return DEFAULT_TOP_IMAGE;
    }
    return config.imgUrl + 'top/' + user.MemberID + '.jpg?ver=' + user.TopVersion;
});

Vue.filter('imageCDN', function (value) {
    if (value) {
        if (value.indexOf('http') == 0) {
            return value;
        } else {
            return config.imgUrl + value;
        }
    }
    return value;
});

Vue.filter('ivCDN', function (value) {
    if (value) {
        value = value.replace(/\.mp4$/g, '.jpg');
        if (value.indexOf('http') == 0) {
            return value;
        } else {
            return config.imgUrl + value;
        }
    }
    return value;
});

Vue.filter('contentCDN', function (value) {
    if (value) {
        if (value.indexOf('http') == 0) {
            return value;
        } else {
            return config.contentHost + value;
        }
    }
    return value;
});


Vue.filter('timeBeforeFormat', window.Filter.dateTimeFormat);

window.Filter.toCHHMMSS = function (value) {
    return new Date(value * 1000).toISOString().substr(11, 8).replace(/^(\d{2}):(\d{2}):(\d{2})$/g, "$1時$2分$3秒").replaceAll(/00./g, '')
}
Vue.filter('chhmmss', window.Filter.toCHHMMSS);

window.Filter.toHHMMSS = function (value) {
    return new Date(value * 1000).toISOString().substr(11, 8)
}
Vue.filter('hhmmss', window.Filter.toHHMMSS);

window.Filter.toMMSS = function (value) {
    return Math.floor(value / 60) + ":" + (value % 60);
}
Vue.filter('mmss', window.Filter.toMMSS);