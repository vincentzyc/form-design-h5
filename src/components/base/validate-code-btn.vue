<template>
  <button class="getVerCode-btn" :disabled="disbtn" @click="getCode()">{{codetxt}} {{time}}</button>
</template>

<script type="text/ecmascript-6">
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
    sendcCode() {
      this.disbtn = true;
      this.codetxt = "重新发送";
      this.time = "60";
      this.$util.countDown(
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
      this.$api.getVerifyCode(this.phone).then(() => {
        this.sendcCode();
      })
    }
  }
};
</script>
<style scoped>
.getVerCode-btn {
  background: #409efe;
  border: 0;
  outline: 0;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  height: 40px;
  min-width: 100px;
  margin-top: 5px;
  margin-left: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.getVerCode-btn:active {
  opacity: 0.7;
}

.getVerCode-btn:disabled {
  opacity: 0.7;
}
</style>

