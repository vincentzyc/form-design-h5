<template>
  <div
    v-if="pageData"
    class="wrapper"
    :class="pageData.theme"
    :style="{...$util.formatStyle(pageData.style),backgroundImage:`url(${pageData.style.backgroundImage})`}"
  >
    <div :class="pageData.template">
      <RenderPage
        :list="pageData.list"
        :fixedTop="pageData.fixedTop"
        :fixedBottom="pageData.fixedBottom"
        :fixedCustom="pageData.fixedCustom"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RenderPage from "@/components/render-page";

export default {
  name: "home",
  components: {
    RenderPage,
  },
  data() {
    return {
      pageData: null,
      // formData: null
    };
  },
  methods: {
    async initPage() {
      if (!this.pageData) return;
      this.BUS.setPageData(this.pageData);
      document.title = this.pageData.title;
      this.$util.initScript(this.pageData.statsCode, 'initjscode');  //添加第三方统计代码
    },
    getPageData() {
      // 获取数据优先级： url参数id > 本地 sessionStorage > postMessage监听

      // 获取url参数id（已经保存的页面）
      // let id = this.$util.getUrlParam('id');
      // 根据id调接口获取后台数据
      // console.log(id);

      // 本地 sessionStorage获取（实时预览的时候刷新页面）
      let sPageData = this.$util.getSessionStorage("pageData");
      if (sPageData) {
        this.pageData = sPageData;
        return this.initPage();
      }

      // postMessage监听（实时预览）
      window.addEventListener('message', event => {
        if (event.origin !== this.$api.postMsgoOrigin()) return;
        if (Object.prototype.toString.call(event.data) === '[object Object]') {
          if (event.data.list) {
            event.source.postMessage('Received', this.$api.postMsgoUrl());
            this.pageData = event.data;
            this.initPage()
            return this.$util.setSessionStorage("pageData", event.data);
          }
        }
      }, false);
    }
  },
  created() {
    this.getPageData();
  }
};
</script>

<style lang="stylus">
@import '~@/assets/css/themes.styl';
</style>