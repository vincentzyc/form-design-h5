import Vue from 'vue';

const vue = new Vue();

export default {
	env() {
		if (process.env.NODE_ENV === "development") return "development";
		return "production";
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
				vue.$createToast({
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
				vue.$createToast({
					txt: '请输入正确的手机号',
					type: 'txt'
				}).show();
				return;
			}
			this.vkcPost(phone).then(res => resolve(res));
		})
	}
}