<template>
  <div class="wg-sms clearfix" :style="item.style">
    <ul class="flex flex-wrap">
      <li :class="[item.styleType==='col1'?'col-12':'col-6']" v-for="(smsBtn,index) in item.smslist" :key="index">
        <div class="flex flex-center" :style="{padding:$util.changeRem(item.style.btnPadding)}">
          <img v-if="item.isImgBtn" v-lazy="smsBtn.img" alt="图片按钮" width="100%" @click="clickBtn(smsBtn)" />
          <button
            v-else
            class="wg-button"
            :style="$util.formatStyle(item.style.btnStyle)"
            @click="clickBtn(smsBtn)"
          >{{smsBtn.btnText}}</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    clickBtn(smsBtn) {
      this.$dialog.confirm({
        ...this.item.dialog,
        message: `<p>${this.item.dialog.message}</p><p 
        style="margin-top:10px;color:#ac242e;font-size:${this.$util.changeRem('12px')}"
        >温馨提示：若不能自动调起短信页面，请手动发送内容"${smsBtn.content}"到"${smsBtn.addressee}"</p>`,
      }).then(() => {
        this.BUS.JSCODE.reportData(['调起短信', smsBtn.addressee], 'action');
        if (this.$util.isQQInternalBrowser()) return window.location.href = `sms:${smsBtn.addressee}`;
        if (this.$util.checkDevice() === 'iOS' && this.$util.isUCBrowser()) return window.location.href = `sms:${smsBtn.addressee}`
        if (this.$util.checkDevice() === 'iOS') return window.location.href = `sms:${smsBtn.addressee}&body=${smsBtn.content}`;
        return window.location.href = `sms:${smsBtn.addressee}?body=${smsBtn.content}`;
      }).catch(() => { });
      this.BUS.JSCODE.reportData(['调起短信弹框', smsBtn.addressee], 'action');
    }
  }
}
</script>