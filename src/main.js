import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import './assets/js';
import "./components/base";
import './assets/css/base.css'
import './assets/css/main.css'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.BASE_URL = process.env.BASE_URL;

new Vue({
	render: h => h(App)
}).$mount('#app')