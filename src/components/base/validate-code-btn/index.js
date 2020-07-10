import './style.styl'
// 使用例子 <ValidateCodeBtn :phone="phone"/>
export default {
  name: "ValidateCodeBtn",
  props: {
    phone: String
  },
  data() {
    return {
      code: "",
      codetxt: "获取验证码",
      time: "",
      disbtn: false
    }
  },
  methods: {
    /**
     * 倒计时
     * @param {Number} time  倒计时秒数
     * @param {Function} tickFunc  每秒回调
     * @param {Function} done     结束后回调
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
    sendcCode() {
      this.disbtn = true;
      this.codetxt = "重新发送";
      this.time = "60";
      this.countDown(
        this.time,
        tick => {
          this.time = tick;
        },
        () => {
          this.time = "";
          this.disbtn = false;
        }
      );
      this.$createToast({
        txt: '验证码已发送',
        type: 'txt'
      }).show();
    },
    getCode() {
      if (this.disbtn) return;
      if (!(/^1[3-9]\d{9}$/.test(this.phone))) {
        this.$createToast({
          txt: '请输入正确的手机号',
          type: 'txt'
        }).show();
        return;
      }
      this.$loading.open('正在发送...');
      this.$api.getVerifyCode(this.phone).then(() => {
        this.$loading.close();
        this.sendcCode();
      })
    }
  },
  render() {
    return (
      <button class="validate-code-btn" disabled={this.disbtn} onClick={() => this.getCode()}>{this.codetxt} {this.time}</button>
    )
  }
}
