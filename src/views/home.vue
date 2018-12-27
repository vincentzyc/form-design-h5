<template>
  <div class="wrapper" v-if="pageData" :style="{background:pageData.config.background}">
    <img v-if="pageData.config.theme" :src="themeBanner" alt="banner" width="100%" class="banner">
    <WidgetItems
      :wgList="pageData.formList"
      v-if="pageData.config.theme"
      ref="formList"
      :class="pageData.config.theme.value"
      :style="{width:pageData.config.theme.contentWidth}"
    />
    <WidgetItems :wgList="pageData.list" ref="list"/>
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
      pageData: null,
      formData: null
    };
  },
  computed: {
    themeBanner() {
      if (this.pageData.config.theme.banner.includes("http")) {
        return this.pageData.config.theme.banner;
      }
      return this.BASE_URL + this.pageData.config.theme.banner;
    },
  },
  watch: {
    pageData(n) {
      document.title = n.config.title;
    }
  },
  methods: {
    clickSubmit() {
      if (!this.$refs.formList.valiAllDate()) return;
      if (!this.$refs.list.valiAllDate()) return;
      this.formData = {
        ...this.$refs.formList.formData,
        ...this.$refs.list.formData
      }
      this.$loading.open({
        text: "正在提交...",
        type: "sandglass"
      });
      setTimeout(() => {
        this.$loading.close();
      }, 3000);
    },
    getPageData() {
      // 获取数据优先级： url参数id > 本地 sessionStorage > postMessage监听

      // 获取url参数id（已经保存的页面）
      // let id = this.$util.getUrlParam('id');
      // 根据id调接口获取后台数据
      // console.log(id);

      // 本地 sessionStorage获取（实时预览的时候刷新页面）
      let sPageData = this.$util.getSessionStorage("pageData");
      if (sPageData) { this.pageData = sPageData; return; }

      // postMessage监听（实时预览）
      window.addEventListener('message', event => {
        if (event.origin !== "http://192.168.218.113:5000") return;
        event.source.postMessage('Received', event.origin);
        this.pageData = event.data;
        this.$util.setSessionStorage("pageData", event.data);
      }, false);
    }
  },
  created() {
    this.getPageData();
  }
};
</script>
