export default {
  /**
   * 获取数据类型
   * @param value 需要判断的值
   */
  getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
  },
	/**
	 * 设置cookie
	 * @param key  key
	 * @param value 值
	 * @param time  保存时间（天）
	 */
  setCookie(key, value, time) {
    var cur = new Date();
    cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (time ? cur.toGMTString() : '');
  },
  getCookie(key) {
    var data = document.cookie;
    var startIndex = data.indexOf(key + '=');
    if (startIndex > -1) {
      startIndex = startIndex + key.length + 1;
      var endIndex = data.indexOf(';', startIndex);
      endIndex = endIndex < 0 ? data.length : endIndex;
      return decodeURIComponent(data.substring(startIndex, endIndex));
    } else {
      return '';
    }
  },
  delCookie(key) {
    var data = this.getCookie(key);
    if (data !== false) this.setCookie(key, data, -1);
  },
  setSessionStorage(key, value) {
    let str = window.JSON.stringify(value);
    if (window.sessionStorage) {
      window.sessionStorage.setItem(key, str);
    }
  },
  getSessionStorage(key) {
    var json = "";
    if (window.sessionStorage) {
      json = window.sessionStorage.getItem(key);
      if (json) {
        json = window.JSON.parse(json);
      }
    }
    return json;
  },
  setLocalStorage(key, value) {
    let str = window.JSON.stringify(value);
    if (window.localStorage) {
      window.localStorage.setItem(key, str);
    }
  },
  getLocalStorage(key) {
    var json = "";
    if (window.localStorage) {
      json = window.localStorage.getItem(key);
      if (json) {
        json = window.JSON.parse(json);
      }
    }
    return json;
  },
	/**
	 * 获取url参数值
	 * @param name  name
	 */
  getUrlParam(name) {
    var reg = new RegExp("([?&])" + name + "=([^&|^#]*)");
    var l = window.location.href;
    var i = l.indexOf("?");
    if (i < 0) return null;
    var str = l.slice(i, l.length);
    if (str) {
      var r = str.match(reg);
      if (r) {
        return decodeURIComponent(r[2]);
      }
    }
    return null;
  },
	/**
	 * 检查手机号是否合法
	 * @param {String} phone 手机号
	 */
  checkMobile(phone) {
    if ((/^1[3-9]\d{9}$/.test(phone))) return true;
    return false;
  },
  /**
	 * 检查网址格式
	 * @param {String} val 网址
	 */
  isLink(val) {
    let pattern = /^(?:(?:https?|ftp):\/\/)?(?:[\da-z.-]+)\.(?:[a-z.]{2,6})(?:\/\w\.-]*)*\/?/;
    let isLink = pattern.test(val);
    return isLink;
  },
  jumpLink(link) {
    let isLink = this.isLink(link);
    if (!isLink) return;
    window.location.href = link
  },
	/**
   * 滑动到指定位置的缓冲动画函数
   * @param {Object} dom 目标dom
   * @param {Number} destination 目标位置
   * @param {Number} rate 缓动率(越大速度越慢)
   * 示例用法
     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
     let dom = scrollTop === document.documentElement.scrollTop ? document.documentElement : document.body;
     this.$util.easeout(dom, 0);
   */
  easeout(dom, destination = 0, rate = 5) {
    let position = dom.scrollTop;
    if (position === destination || typeof destination !== "number" || rate === 0) {
      return false;
    }
    // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (fn) {
        return setTimeout(fn, 17);
      };
    }
    let step = function () {
      position = position + (destination - position) / rate;
      if (Math.abs(destination - position) < 1) {
        //动画结束
        dom.scrollTop = destination;
        return;
      }
      dom.scrollTop = position;
      requestAnimationFrame(step);
    };
    step();
  },
  /**
   * 滚动到指定元素
   * @param {Object} el 当前dom元素 
   * @param {Number} offset 元素距离顶部的偏移量
   */
  scrollIntoView(el, offset = 200) {
    if (!el) return;
    if (typeof offset !== 'number') return;
    let clientRect = el.getBoundingClientRect();
    let isElementInViewport = clientRect.top >= 0 && clientRect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    if (!isElementInViewport) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let dom = scrollTop === document.documentElement.scrollTop ? document.documentElement : document.body;
      let destination = (scrollTop + clientRect.top - offset) > 0 ? (scrollTop + clientRect.top - offset) : 0
      this.easeout(dom, destination, 10)
    }
  },
  /**
	 * 执行js代码
	 * @param {String} jscode js代码
	 * @param {String} scriptid id标识（相同id只执行一次，不传id每次都会执行）
	 */
  initScript(jscode, scriptid) {
    if (typeof jscode !== 'string') return;
    if (scriptid && document.getElementById(scriptid)) return;
    jscode = jscode.replace(/[\r\n]/g, '');  //去除换行
    if (/<script(.*)src=(.*)><\/script>/.test(jscode)) {
      let arr = jscode.match(/src=["|']?(.*?)('|"|>|\\s+)/);
      let script = document.createElement("script");
      script.src = arr[1];
      document.head.appendChild(script);
      return;
    }
    let arr = jscode.match(/<script(.*)>(.*)<\/script>/);
    if (Array.isArray(arr) && arr.length >= 3) jscode = arr[2];  //提取js代码
    let script = document.createElement("script");
    if (scriptid) script.id = scriptid;
    script.type = "text/javascript";
    script.innerHTML = jscode;
    document.head.appendChild(script);
  },
  /**
   * 判断是微信内还是微信外打开
   */
  isWechat() {
    return /micromessenger/.test(window.navigator.userAgent.toLowerCase());
  },
  /**
   * 文本截取换行
   * @param {String} text 文本字符
   * @param {String} sign 换行标识 
   */
  textBr(text, sign = '\n') {
    let brstr = '';
    let arr = text.split(sign);
    arr.forEach(v => {
      brstr += v + "</br>"
    })
    return brstr;
  },
  /**
   * px转rem
   * @param {String} str 含 px 字符串  例如：50px 10px 0 10px ; <span style="16px">测试</span>
   * @return {String} 转化后含rem字符串 例如：1rem 0.3rem 0 0.2rem ; <span style="0.32rem">测试</span>
   */
  changeRem(str = "") {
    if (this.getType(str) !== 'String') str = str.toString();
    let nospace = str.trim();
    return nospace.replace(/(-?\d+)(px)/g, (a, b) => {
      return b / 50 + 'rem'
    })
  },
  /**
   * 格式化对象格式样式 px转rem
   * @param {Object} obj 格式化对象
   */
  formatStyle(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && this.getType(obj[key]) === 'String') {
        if (obj[key].includes('px')) obj[key] = this.changeRem(obj[key])
      }
    }
    return obj
  }
}