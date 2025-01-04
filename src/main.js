import Vue from 'vue'
import ElementUI from 'element-ui';
import excel from 'vue-excel-export'
import VueLogger from 'vuejs-logger'
import App from './App.vue'
import router from './router'
import './plugins/filter'
import lang from './assets/js/lang'
import api from './plugins/api'
import './plugins/validate'
import './plugins/datetimepicker'
import './plugins/directive'
import './plugins/utils'
import './plugins/fileupload'



import "element-ui/lib/theme-chalk/index.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


const options = {
  // optional : defaults to true if not specified
  isEnabled: true,
  // required ['debug', 'info', 'warn', 'error', 'fatal']
  logLevel : 'debug',
  // optional : defaults to false if not specified
  stringifyArguments : false,
  // optional : defaults to false if not specified
  showLogLevel : false,
  // optional : defaults to false if not specified
  showMethodName : false,
  // optional : defaults to '|' if not specified
  separator: '|',
  // optional : defaults to false if not specified
  showConsoleColors: false
}

Vue.use(VueLogger, options)


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(ElementUI)
Vue.use(excel)

Vue.config.productionTip = false
Vue.prototype.$lang = lang;
Vue.prototype.$api = api;
window.$api = api;

import './plugins/datatable'

Array.prototype.remove = function () {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

Array.prototype.groupBy = function (callback) {
  return this.reduce(function (groups, item) {
    const val = callback (item);
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
};

//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/backend.css'
//import './assets/css/adminlte.min.css'

new Vue({
  router,
  render: h => h(App),
  mounted() {
    window.alert = (msg, callback) => {
      this.$bvModal.msgBoxOk(msg, {
        title: '訊息提示',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        okTitle: '確定',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      })
        .then(value => {
          if (callback) {
            callback(value);
          }
        })
        .catch(err => {
          // An error occurred
        })
    };
    window.confirm = (msg, callback) => {
      this.$bvModal.msgBoxConfirm(msg, {
        title: '請確認',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: '確定',
        cancelTitle: '取消',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value && callback) {
            callback(value);
          }
        })
        .catch(err => {
          // An error occurred
        })
    };

    window.blockUI = () => $('.loading').show();
    window.unblockUI = () => $('.loading').hide();

    window.unblockUI();
  }
}).$mount('#app')