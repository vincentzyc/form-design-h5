import Loading from "./loading"; // loading

const version = '1.0';
const install = function(Vue) {

	if (install.installed) return;

	Vue.$loading = Vue.prototype.$loading = Loading; //注册全局方法组件

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install,
	version
};

/**
 * 使用方法：
 * 1：将此文件夹复制到项目中
 * 2：在mainjs里引入 
 *    import BaseComponents from "此文件夹路径";
 *    Vue.use(BaseComponents)
 * 3：各组件使用方法请查看各组件的.vue文件的注释
 */