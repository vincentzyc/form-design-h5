// import Vue from 'vue';

// const vue = new Vue();

export default {
	vkcPost() {
		return new Promise(resolve => {
			setTimeout(() => {
				if (Math.random() * 10 > 5) {
					return resolve({ code: 0, msg: "成功", data: "success" });
				}
				alert("网络异常")
			}, 500);
		});
	},
	/**
	 * 获取验证码
	 * @param phone  手机号
	 */
	async getVerifyCode(phone) {
		// if (!(/^1[3-9]\d{9}$/.test(phone))) {
		// 	vue.$createToast({
		// 		txt: '请输入正确的手机号',
		// 		type: 'txt'
		// 	}).show();
		// 	return;
		// }
		return await this.vkcPost(phone);
		// vue.$loading.open();
		// this.vkcPost("supermarketloan/edu/getVerifyCode", { phone: phone, eventMarketId: idList.eventMarketId }).then(res => {
		// resolve(res);
		// vue.$loading.close();
		// });
	}
}