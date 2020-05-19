<template>
  <div class="widget-list">
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
    <transition name="fade">
      <div v-if="fixedBottom.length>0&&showFixedBottom" class="wg-fixed-bottom" style="max-width:640px">
        <template v-for="fbItem in fixedBottom">
          <WidgetItems :item="fbItem" :key="fbItem.key" />
        </template>
      </div>
    </transition>
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
    fixedBottom: Array
  },
  data() {
    return {
      showFixedBottom: true
    };
  },
  methods: {
    showFixed() {
      if (this.fixedBottom.length <= 0) return
      if (this.fixedBottom[0] && this.fixedBottom[0].hasOwnProperty('scrollHeight')) {
        this.showFixedBottom = this.fixedBottom[0].scrollHeight === 0;
        window.addEventListener('scroll', () => {
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          this.showFixedBottom = scrollTop >= this.fixedBottom[0].scrollHeight
        })
      }
    }
  },
  created() {
    this.showFixed()
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/widget.styl';
</style>