import Vue from 'vue'
import user from '../plugins/user'
import $ from "jquery";

function isAuth(key) {
    var u = user.user;
    key = key.replace(/'/g, '');
    if (key.indexOf(',') > 0) {
        if (u.role) {
            var ks = key.split(',');
            console.log(ks);
            for (var k in ks) {
                if (u.role.indexOf(ks[k]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    } else {
        return u.role && u.role.indexOf(key) >= 0;
    }
};
Vue.directive('auth', {
    bind: function (el, binding, vnode) {       
        if (!isAuth(binding.expression)) {
            setTimeout(function () {
                $(el).remove();
            });
        }
    }
});
Vue.directive('notAuth', {
    bind: function (el, binding, vnode) {       
        if (isAuth(binding.expression)) {
            setTimeout(function () {
                $(el).remove();
            });
        }
    }
});