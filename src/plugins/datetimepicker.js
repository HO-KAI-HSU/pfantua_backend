import Vue from 'vue'

function deepSet(obj, value, path) {
    var i;
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    obj[path[i]] = value;
}

function deepGet(obj, path) {
    var i;
    if (!path) {
        return null;
    }
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    return obj[path[i]];
}

Vue.directive('datetimepicker', {
    bind: function (el, binding, vnode) {
        var val = deepGet(vnode.context, binding.expression);
        var min = moment({
            y: 1800,
            M: 0,
            d: 1
        });
        var attr = $(el).attr('min');
        if (attr) {
            if (attr == 'today') {
                min = moment().subtract(1, 'days');
            } else {
                min = moment(attr);
            }
        }
        console.log(val);
        window.$(el).datetimepicker({
            format: 'LT',
            defaultDate: val,
            minDate: min,
        });
        $(el).on('dp.change', function (e) {
            if (binding.expression) {
                deepSet(vnode.context, moment(e.date).format('YYYY/MM/DD HH:mm:ss'), binding.expression);
            }
        })
    },
    update: function (el, binding, vnode) {
        var datetimepicker = $(el).data("DateTimePicker");
        if (datetimepicker && binding.value) {
            datetimepicker.date(binding.value);
        }
    }
});

Vue.directive('daterangepicker', {
    bind: function (el, binding, vnode) {
        var exp = binding.expression.replace(/[\[\] ]/g, '').split(',');
        var start = deepGet(vnode.context, exp[0]);
        var end = deepGet(vnode.context, exp[1]);
        var min = moment({
            y: 1800,
            M: 0,
            d: 1
        });
        var attr = $(el).attr('min');
        if (attr) {
            if (attr == 'today') {
                min = moment().subtract(1, 'days');
            } else {
                min = moment(attr);
            }
        }
        console.log(start);
        console.log(end);
        $(el).daterangepicker({
            timePicker: true,
            timePickerIncrement: 10,
            locale: {
                format: 'YYYY/MM/DD HH:mm'
            },
            startDate: start,
            endDate: end
        });
        $(el).on('apply.daterangepicker', function (ev, picker) {
            if (binding.expression) {
                deepSet(vnode.context, picker.startDate.format('YYYY-MM-DD HH:mm:00'), exp[0]);
                deepSet(vnode.context, picker.endDate.format('YYYY-MM-DD HH:mm:59'), exp[1]);
            }
        })
    },
    update: function (el, binding, vnode) {
        var datetimepicker = $(el).data("daterangepicker");
        if (datetimepicker && binding.expression) {
            var exp = binding.expression.replace(/[\[\] ]/g, '').split(',');
            datetimepicker.setStartDate(deepGet(vnode.context, exp[0]));
            datetimepicker.setEndDate(deepGet(vnode.context, exp[1]));
        }
    }
});