export default {
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
	 * 倒计时
	 * @param  time  倒计时秒数
	 * @param  tickFunc  每秒执行
	 * @param  done     结束后回调
	 */
	countDown(time, tickFunc, done) {
		let tick = () => {
			setTimeout(() => {
				if (time > 0) {
					time--;
					tickFunc(time);
					tick();
				} else {
					done();
					return;
				}
			}, 1000);
		};
		tick();
	},
	/**
	 * 获取日期时间 默认格式 "yyyy-mm-dd hh:mm:ss"
	 * @param {String} formatType  可选 格式类型
	 * @param {Date} formatDate  可选 指定日期
	 * @return {String} 所需格式的日期
	 */
	getFormatDate(formatType, formatDate) {
		let type = formatType || 'yyyy-mm-dd hh:mm:ss';
		let date = Object.prototype.toString.call(formatDate) === "[object Date]" ? formatDate : new Date();
		let currentdate = '';
		let month = date.getMonth() + 1;
		let strDate = date.getDate();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		month >= 1 && month <= 9 ? month = "0" + month : '';
		strDate >= 0 && strDate <= 9 ? strDate = "0" + strDate : '';
		minutes >= 0 && minutes <= 9 ? minutes = "0" + minutes : '';
		seconds >= 0 && seconds <= 9 ? seconds = "0" + seconds : '';

		switch (type.toLowerCase()) {
			case 'yyyy-mm-dd hh:mm:ss':
				currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours() + ":" + minutes + ":" + seconds;
				break;
			case 'yyyy-mm-dd':
				currentdate = date.getFullYear() + "-" + month + "-" + strDate;
				break;
			case 'yyyy-mm-dd hh:mm':
				currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours() + ":" + minutes;
				break;
			case 'yyyy-mm-dd hh':
				currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours();
				break;
			case 'yyyy-mm':
				currentdate = date.getFullYear() + "-" + month;
				break;
			case 'yyyy':
				currentdate = date.getFullYear();
				break;
			default:
				currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours() + ":" + minutes + ":" + seconds;
				break;
		}
		return currentdate;
	},
	/**
	 * 缓冲函数
	 * @param {Object} dom 目标dom
	 * @param {Number} destination 目标位置
	 * @param {Number} rate 缓动率
	 * 示例用法
	  var dom = document.documentElement || document.body;
	  this.$api.easeout(dom, 0, 5);
	 */
	easeout(dom, destination = 0, rate = 3) {
		let position = dom.scrollTop;
		if (position === destination || typeof destination !== 'number' || rate === 0) {
			return false;
		}
		// 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(fn) {
				return setTimeout(fn, 17);
			}
		}
		let step = function() {
			position = position + (destination - position) / rate;
			if (Math.abs(destination - position) < 1) { //动画结束
				dom.scrollTop = destination;
				return;
			}
			dom.scrollTop = position;
			requestAnimationFrame(step);
		};
		step();
	},
	/**
	 * 添加matomo统计
	 * @param {Number} id matomo统计id
	 */
	addMatomo(id) {
		if (document.getElementById("matomoCode")) return;
		let script = document.createElement("script"),
			jscode = `
		var _paq = _paq || [];
		_paq.push(['trackPageView']);
		_paq.push(['enableLinkTracking']);
		(function() {
		  var u="//xxx.com/";
		  _paq.push(['setTrackerUrl', u+'piwik.php']);
		  _paq.push(['setSiteId', '${id}']);
		  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
		  g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
		})();
		`;
		script.type = "text/javascript";
		script.id = "matomoCode";
		try {
			script.appendChild(document.createTextNode(jscode));
		} catch (ex) {
			script.text = jscode;
		}
		document.head.appendChild(script);
	},
}