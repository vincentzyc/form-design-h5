<template>
  <div class="widget-list">
    <template v-if="fixedTop.length>0">
      <transition name="fade">
        <div v-show="showFixedTop" class="wg-fixed-top" style="max-width:640px">
          <template v-for="ftItem in fixedTop">
            <WidgetItems :item="ftItem" :key="ftItem.key" />
          </template>
        </div>
      </transition>
    </template>

    <transition name="fade" v-if="fixedCustom.length>0">
      <div ref="fixedCustom" class="wg-fixed-custom" style="max-width:640px">
        <template v-for="fcItem in fixedCustom">
          <WidgetItems :item="fcItem" :key="fcItem.key" class="fixed-item" :style="fixedCustomStyle(fcItem)" />
        </template>
      </div>
    </transition>
    <template v-for="item in list">
      <div
        v-if="item.type === 'formList'"
        class="widget-form-list"
        :style="$util.formatStyle(item.style)"
        :key="item.key"
      >
        <template v-for="formItem in item.list">
          <WidgetItems ref="wgList" :item="formItem" :key="formItem.key" />
        </template>
      </div>
      <WidgetItems v-else ref="wgList" :item="item" :key="item.key" />
    </template>

    <template v-if="fixedBottom.length>0">
      <transition name="fade">
        <div v-show="showFixedBottom" class="wg-fixed-bottom" style="max-width:640px">
          <template v-for="fbItem in fixedBottom">
            <WidgetItems :item="fbItem" :key="fbItem.key" />
          </template>
        </div>
      </transition>
    </template>

    <van-dialog
      v-if="BUS.pageData.hijackBack"
      v-model="backAlert"
      get-container="body"
      :showConfirmButton="false"
      :style="{'background-color': 'transparent'}"
    >
      <img
        :src="BUS.pageData.hijackBack.alertImg"
        alt="图片"
        class="flex"
        width="100%"
        @click="clickAlertImg(BUS.pageData.hijackBack.alertLink)"
      />
    </van-dialog>
  </div>
</template>

<script>
import WidgetItems from "@/components/widget-items";

export default {
  name: "renderPage",
  components: {
    WidgetItems
  },
  props: {
    list: Array,
    fixedTop: {
      type: Array,
      default: () => []
    },
    fixedCustom: {
      type: Array,
      default: () => []
    },
    fixedBottom: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showFixedBottom: true,
      showFixedTop: true,
      backAlert: false
    };
  },
  methods: {
    fixedCustomStyle(item) {
      if (item.position) {
        return this.$util.formatStyle({
          width: item.style.width,
          top: item.position.top + 'px',
          [item.position.side]: item.position[item.position.side] + '%'
        })
      }
    },
    showFixed() {
      if (this.fixedBottom.length <= 0 && this.fixedTop.length <= 0) return
      let fbData = this.fixedBottom.length > 0 ? this.fixedBottom[0] : '';
      let ftData = this.fixedTop.length > 0 ? this.fixedTop[0] : '';
      if (fbData.hasOwnProperty('scrollHeight')) this.showFixedBottom = fbData.scrollHeight === 0;
      if (ftData.hasOwnProperty('scrollHeight')) this.showFixedTop = ftData.scrollHeight === 0;
      window.addEventListener('scroll', () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (fbData.hasOwnProperty('scrollHeight')) this.showFixedBottom = scrollTop >= fbData.scrollHeight
        if (ftData.hasOwnProperty('scrollHeight')) this.showFixedTop = scrollTop >= ftData.scrollHeight
      })
    },
    clickAlertImg(link) {
      let isLink = this.$util.isLink(link);
      if (!isLink) link = window.location.href;
      window.location.href = link;
    },
    hijackBack() {
      if (window.history.pushState) {
        window.history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.handleBack, false);
      }
    },
    handleBack() {
      this.backAlert = true;
      this.$api.reportMatomo('劫持返回弹框')
      // console.log("点击了浏览器的返回按钮");
      // history.pushState(null, null, document.URL);
      // window.history.back();
    }
  },
  created() {
    this.showFixed();
    if (this.BUS.pageData?.hijackBack?.isHijack) this.hijackBack()
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/widget.styl';
</style>