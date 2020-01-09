<template>
  <div class="wg-wechat clearfix" :style="{backgroundColor:item.backgroundColor}">
    <div v-if="item.style.isImgBtn" class="flex flex-center" @click="copy()" :style="$util.formatStyle(item.style)">
      <img :src="item.style.value" alt="图片按钮" width="100%" />
    </div>
    <div v-else class="flex align-middle wg-wechat-wrap" :style="$util.formatStyle(item.style)">
      <div v-if="item.showLogo" class="wechat-avatar flex-none">
        <img v-if="item.logo" :src="item.logo" alt="公众号logo" width="100%" />
        <img v-else src="@/assets/img/wxlogo.png" alt="公众号logo" width="100%" />
      </div>
      <div v-if="item.showName" class="flex-auto">{{item.value}}</div>
      <div
        class="wechat-btn"
        :class="[item.showName?'flex-none':'flex-auto']"
        :style="$util.formatStyle(item.style.btnStyle)"
        @click="copy()"
      >{{item.btnText}}</div>
    </div>
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
    copy() {
      this.$copyText(this.item.wechatName).then(() => {
        this.$createDialog({
          type: 'alert',
          title: '复制成功',
          content: '请在微信粘贴搜索',
          icon: 'cubeic-right',
          onConfirm: () => this.confirm()
        }).show()
      }, () => {
        this.$createDialog({
          type: 'alert',
          title: '很抱歉',
          content: '您的浏览器不支持自动复制公众号，请手动复制后打开微信搜索'
        }).show()
      })
    },
    confirm() {
      if (this.$util.isWechat()) return;
      window.location.href = "weixin://"
    }
  }
}
</script>