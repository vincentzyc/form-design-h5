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
      return `${arr[0]}:${arr[1]}:9000`
    }
    return window.location.origin + "/form-design-h5"
  },
  previewOrigin() {
    if (this.env() === "development") {
      let arr = window.location.origin.split(":");
      return `${arr[0]}:${arr[1]}:9000`
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
      return `${arr[0]}:${arr[1]}:9000`
    }
    return window.location.origin + "/form-design"
  },
  postMsgoOrigin() {
    if (this.env() === "development") {
      let arr = window.location.origin.split(":");
      return `${arr[0]}:${arr[1]}:9000`
    }
    return window.location.origin
  },
  testPost() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ code: 0, msg: "成功", data: "success" });
      }, 200);
    });
  },
	/**
	 * 获取验证码
	 * @param phone  手机号
	 */
  getVerifyCode(phone) {
    return new Promise(resolve => {
      this.testPost(phone).then(res => resolve(res));
    })
  }
}

export default Api