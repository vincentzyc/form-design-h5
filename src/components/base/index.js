import Vue from 'vue';

import Loading from "./loading"; // loading
import ValidateCodeBtn from "./validate-code-btn"; // 验证码按钮
import HorizontalPicker from "./horizontal-picker"; // 横向滑动自动选择组件

let MyPlugin = {};

MyPlugin.install = function(Vue) {

	if (this.installed) return;

  Vue.component(ValidateCodeBtn.name, ValidateCodeBtn); //注册组件
  Vue.component(HorizontalPicker.name, HorizontalPicker); //注册组件

	Vue.$loading = Vue.prototype.$loading = Loading; //注册全局方法组件

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
	MyPlugin.install(window.Vue);
}

Vue.use(MyPlugin)

export default MyPlugin

/**
 * 使用方法：
 * 1：将此文件夹复制到项目中
 * 2：在mainjs里引入 
 *    import "此文件夹路径";
 * 3：各组件使用方法请查看各组件的.vue文件的注释
 */