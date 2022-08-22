// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueCookie from 'vue-cookie'
import './assets/shop.css';  //自定义全局css

import base from '@/common/js/base.js'
Object.keys(base).forEach(item => {
	Vue.prototype[item] = base[item];
});

Vue.prototype.$http = axios;
Vue.use(Vant);
Vue.use(VueCookie)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
