<template>
  <div class="wrapper" v-if="pageData" :style="{background:pageData.config.background}">
    <img v-if="theme" :src="themeBanner" alt="banner" width="100%" class="banner">
    <WidgetItems
      v-if="pageData.formList.length>0"
      :wgList="pageData.formList"
      ref="formList"
      :class="theme.value"
      :style="{width:theme.contentWidth,borderRadius:theme.borderRadius?'10px':'0'}"
    />
    <WidgetItems v-if="pageData.list.length>0" :wgList="pageData.list" ref="list"/>
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
    theme() {
      if (this.pageData) {
        return this.pageData.config.theme;
      }
      return null
    },
    themeBanner() {
      if (this.theme.banner.includes("http") || this.theme.banner.includes("https")) {
        return this.theme.banner;
      }
      return this.BASE_URL + this.theme.banner;
    },
  },
  watch: {
    pageData(n) {
      document.title = n.config.title;
      // this.$util.addMatomo(n.config.matomoId);
    }
  },
  methods: {
    clickSubmit() {
      if (this.$refs.formList && !this.$refs.formList.valiAllDate()) return;
      if (this.$refs.list && !this.$refs.list.valiAllDate()) return;
      let formListData = this.$refs.formList ? { ...this.$refs.formList.formData } : {};
      let listData = this.$refs.list ? { ...this.$refs.list.formData } : {};
      this.formData = {
        ...formListData,
        ...listData
      }
      this.$loading.open({
        text: "正在提交...",
        type: "sandglass"
      });
      setTimeout(() => {
        this.$loading.close();
        this.$createDialog({
          type: 'alert',
          title: '提示',
          content: '提交成功'
        }).show()
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
        if (event.origin !== this.$api.postMsgoOrigin()) return;
        if (Object.prototype.toString.call(event.data) === '[object Object]') {
          if (event.data.config && event.data.formList && event.data.list) {
            event.source.postMessage('Received', this.$api.postMsgoUrl());
            this.pageData = event.data;
            this.$util.setSessionStorage("pageData", event.data);
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
