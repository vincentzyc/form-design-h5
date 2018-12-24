<template>
  <div class="home" v-if="pageData">
    <WidgetItems :wgList="pageData.list"/>
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
      if (this.pageData) return;
      let sPageData = this.$api.getSessionStorage("pageData");
      if (sPageData) { this.pageData = sPageData; return; }
      setTimeout(() => {
        console.log("methods", "getPageData");
        this.getPageData()
      }, 100);
    }
  },
  created() {
    window.addEventListener('message', event => {
      if (event.origin !== "http://192.168.218.113:5000") return;
      event.source.postMessage('Received', event.origin);
      this.pageData = event.data;
      this.$api.setSessionStorage("pageData", event.data);
    }, false);
    this.getPageData()
  }
};
</script>
