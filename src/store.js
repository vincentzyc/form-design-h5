import Vue from 'vue'

export default new Vue({
  data() {
    return {
      pageData: "",
      valiPopupDate: false
    }
  },
  methods: {
    setPageData(newValue) {
      this.pageData = newValue
    },
    setValiPopupDate(newValue) {
      this.valiPopupDate = newValue
    }
  }
});