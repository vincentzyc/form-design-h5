<template>
  <div class="home" v-if="pageData">
    <WidgetItems :wgList="pageData.list" :style="{background:pageData.config.background}"/>
  </div>
</template>

<script>
// @ is an alias to /src
import WidgetItems from "@/components/widget-items";

export default {
  name: "home",
  components: {
    WidgetItems
  },
  data() {
    return {
      pageData: null
    };
  },
  watch: {
    pageData(n) {
      document.title = n.config.title;
    }
  },
  methods: {
    getPageData() {
      // 获取数据优先级： url参数id > 本地 sessionStorage > postMessage监听

      // 获取url参数id（已经保存的页面）
      // let id = this.$api.getUrlParam('id');
      // 根据id调接口获取后台数据
      // console.log(id);

      // 本地 sessionStorage获取（实时预览的时候刷新页面）
      let sPageData = this.$api.getSessionStorage("pageData");
      if (sPageData) { this.pageData = sPageData; return; }

      // postMessage监听（实时预览）
      window.addEventListener('message', event => {
        if (event.origin !== "http://192.168.218.113:5000") return;
        event.source.postMessage('Received', event.origin);
        this.pageData = event.data;
        this.$api.setSessionStorage("pageData", event.data);
      }, false);
    }
  },
  created() {
    this.getPageData()
  }
};
</script>
