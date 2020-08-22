import Vue from 'vue'
import './plugins/axios'
import Api from './api';
import Util from './utils';
import "./components/base";
import './assets/css/base.css'
import './assets/css/main.css'
import App from './App.vue'
import store from './store';  // 状态管理实例，用于组件通信（项目复杂使用vuex）

import VueClipboard from 'vue-clipboard2'

import { Popup, Lazyload, Dialog, Toast } from 'vant';

Vue.prototype.$api = Api;
Vue.prototype.$util = Util;

Vue.use(Popup)
Vue.use(Dialog);
Vue.use(Toast);

Vue.use(Lazyload, {
  lazyComponent: true,
  preLoad: 1.6
});

Vue.use(VueClipboard)

Vue.config.productionTip = false

Vue.prototype.BASE_URL = process.env.BASE_URL;

Vue.prototype.BUS = store;

new Vue({
  render: h => h(App)
}).$mount('#app')