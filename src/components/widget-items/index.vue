<template>
  <div class="hello">
    <template v-for="item in wgList">
      <div class="widget-view" :key="item.key" :class="{'widget-view-imgshow':item.type === 'imgshow','widget-view-button':item.type === 'button'}">
        <WgPhone v-if="item.type === 'phone'" :ref="item.key" :item="item"/>
        <WgInput v-if="item.type === 'input'" :ref="item.key" :item="item"/>
        <WgCheckbox v-if="item.type === 'checkbox'" :ref="item.key" :item="item"/>
        <WgSelect v-if="item.type === 'select'" :ref="item.key" :item="item"/>
        <WgSwitch v-if="item.type === 'switch'" :ref="item.key" :item="item"/>
        <WgDate v-if="item.type === 'date'" :ref="item.key" :item="item"/>

        <div v-if="item.type === 'imgshow'" :style="item.style">
          <div class="flex flex-center">
            <img :src="item.value" alt="图片展示" width="100%">
          </div>
        </div>

        <div v-if="item.type === 'button'" :style="item.style">
          <div class="flex flex-center">
            <button class="wg-button" @click="clickBtn(item)">{{item.btnText}}</button>
          </div>
        </div>

        <div v-if="item.type === 'staticText'" class="wg-staticText" :style="item.style">
          <p :style="item.style">{{item.value}}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import WgPhone from "./wg-phone"
import WgInput from "./wg-input"
import WgCheckbox from "./wg-checkbox"
import WgSelect from "./wg-select"
import WgSwitch from "./wg-switch"
import WgDate from "./wg-date"
export default {
  name: "widgetItems",
  components: {
    WgPhone,
    WgInput,
    WgCheckbox,
    WgSelect,
    WgSwitch,
    WgDate
  },
  props: {
    wgList: Array
  },
  data() {
    return {
      formData: {}
    };
  },

  methods: {
    clickBtn(e) {
      switch (e.btnType) {
        case "submit":
          this.clickSubmit();
          break;

        default:
          break;
      }
    },
    clickSubmit() {
      if (!this.valiAllDate()) return;
      this.$loading.open({
        text: "正在提交...",
        type: "sandglass"
      });
      setTimeout(() => {
        this.$loading.close();
      }, 3000);
    },
    valiAllDate() {
      let flag = true;
      for (const item of this.wgList) {
        if (!Array.isArray(this.$refs[item.key])) continue;
        if (typeof this.$refs[item.key][0].validate !== 'function') {
          this.formatParam(item);
          continue;
        };
        let result = this.$refs[item.key][0].validate();
        if (result === true) {
          this.formatParam(item);
          continue
        };
        this.$createToast({
          time: 1500,
          txt: result,
          type: 'txt'
        }).show();
        flag = false;
        break;
      }
      return flag;
    },
    formatParam(item) {
      if (!item.hasOwnProperty("apiKey")) return;
      if (item.type === 'phone' && item.showCode) this.formData[item.codeKey] = item.codeValue;
      this.formData[item.apiKey] = item.value;
    },
    axiosPost() {
      this.$axios
        .post("xxx", "hello world")
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@require '../../assets/css/widget.styl';
</style>
