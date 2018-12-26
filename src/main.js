import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import './assets/css/base.css'
import './assets/css/main.css'
import Api from './assets/js/api';
import BaseComponents from "./components/base";

Vue.config.productionTip = false
Vue.prototype.BASE_URL = process.env.BASE_URL;

Vue.use(Api)
Vue.use(BaseComponents)

new Vue({
	render: h => h(App)
}).$mount('#app')