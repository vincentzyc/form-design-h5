import Vue from "vue";
import apiModule1 from './apiModule1.js';
import apiModule2 from './apiModule2.js';

const vm = new Vue()

const createInterface = arr => {
	let Interface = {};
	arr.forEach(v => {
		Interface[v.name] = param => {
			return new Promise(reslove => {
				Api.axiosPost(v.url, param).then(res => reslove(res))
			})
		}
	});
	return Interface
}

const Api = {
	ApiModule1: createInterface(apiModule1),
	ApiModule2: createInterface(apiModule2),
	env() {
		if (process.env.NODE_ENV === "development") return "development";
		return "production";
	},
	previewUrl() {
		if (this.env() === "development") {
			let arr = window.location.origin.split(":");
			return `${arr[0]}:${arr[1]}:3000`
		}
		return window.location.origin + "/form-design-h5"
	},
	previewOrigin() {
		if (this.env() === "development") {
			let arr = window.location.origin.split(":");
			return `${arr[0]}:${arr[1]}:3000`
		}
		return window.location.origin
	},
	apiUrl() {
		return "http://xxx.com/";
	},
	axiosPost(url, data) {
		return new Promise(resolve => {
			vm.$axios.post(this.apiUrl() + url, data).then(res => {
				resolve(res);
			}).catch(error => {
				console.log(error);
			});
		})
	},
	postMsgoUrl() {
		if (this.env() === "development") {
			let arr = window.location.origin.split(":");
			return `${arr[0]}:${arr[1]}:5000`
		}
		return window.location.origin + "/form-design"
	},
	postMsgoOrigin() {
		if (this.env() === "development") {
			let arr = window.location.origin.split(":");
			return `${arr[0]}:${arr[1]}:5000`
		}
		return window.location.origin
	},
	vkcPost() {
		return new Promise(resolve => {
			setTimeout(() => {
				if (Math.random() * 10 > 5) {
					return resolve({ code: 0, msg: "成功", data: "success" });
				}
				vm.$createToast({
					txt: '网络异常',
					type: 'txt'
				}).show();
			}, 500);
		});
	},
	/**
	 * 获取验证码
	 * @param phone  手机号
	 */
	getVerifyCode(phone) {
		return new Promise(resolve => {
			if (!(/^1[3-9]\d{9}$/.test(phone))) {
				vm.$createToast({
					txt: '请输入正确的手机号',
					type: 'txt'
				}).show();
				return;
			}
			this.vkcPost(phone).then(res => resolve(res));
		})
	}
}

export default Api