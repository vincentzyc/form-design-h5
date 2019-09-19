import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import Api from './api';
import Util from './utils';
import "./components/base";
import './assets/css/base.css'
import './assets/css/main.css'
import App from './App.vue'
import store from './store';  // 状态管理实例，用于组件通信（项目复杂使用vuex）

Vue.prototype.$api = Api;
Vue.prototype.$util = Util;

Vue.config.productionTip = false

Vue.prototype.BASE_URL = process.env.BASE_URL;

Vue.prototype.BUS = store;

new Vue({
	render: h => h(App)
}).$mount('#app')