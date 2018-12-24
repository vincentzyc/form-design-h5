<template>
  <button class="getVerCode-btn" :disabled="disbtn" @click="getCode()">{{codetxt}} {{time}}</button>
</template>

<script type="text/ecmascript-6">
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
      this.$api.countDown(
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
      if (!this.$api.checkMobile(this.phone)) {
        this.$createToast({
          txt: '请输入正确的手机号',
          type: 'txt'
        }).show();
        return;
      }
      this.sendcCode();
    }
  }
};
</script>
