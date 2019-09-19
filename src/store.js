import Vue from 'vue'

export default new Vue({
  data() {
    return {
      pageData: "",
    }
  },
  methods: {
    setPageData(newValue) {
      this.pageData = newValue
    }
  }
});