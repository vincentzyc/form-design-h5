import Vue from 'vue';

const vue = new Vue();

export default {
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
			resolve({ code: 0, msg: "成功" });
			// vue.$loading.open();
			// this.vkcPost("supermarketloan/edu/getVerifyCode", { phone: phone, eventMarketId: idList.eventMarketId }).then(res => {
			// resolve(res);
			// vue.$loading.close();
			// });
		});
	}
}