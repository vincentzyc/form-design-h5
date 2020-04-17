<template>
  <van-popup v-model="showAgreement" class="agreement-popup" style="max-width:576px;">
    <div class="agreement-wrap">
      <iframe :src="text" frameborder="0" style="width: 100%;height: 100%;" v-if="isLinkText"></iframe>
      <p class="agreement-text" v-html="$util.textBr(text)" v-else></p>
    </div>
    <div class="agreement-confirm" @click="close()">我知道了</div>
  </van-popup>
</template>

<script type="text/ecmascript-6">
export default {
  name: "AgreementPopup",
  data() {
    return {
      showAgreement: false,
      text: ""
    }
  },
  computed: {
    isLinkText() {
      return this.$util.isLink(this.text)
    }
  },
  methods: {
    open(text) {
      this.text = text || "";
      this.showAgreement = true;
    },
    close() {
      this.showAgreement = false;
      this.$emit('close')
    }
  }
};
</script>
<style lang="stylus" scoped>
.agreement-popup {
  height: 86vh;
  width: 90%;
  border-radius: 10px;
  padding-bottom: 41px;

  .agreement-wrap {
    padding: 10px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .agreement-text {
    font-size: 12px;
    line-height: 20px;
  }

  .agreement-confirm {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 14px;
    color: #1989fa;
    border-top: 1px solid #eee;
    text-align: center;
    line-height: 40px;
  }
}
</style>

