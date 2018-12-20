<template>
  <div class="hello">
    <template v-for="item in wgList">
      <div class="widget-view" :key="item.key" :class="{'widget-view-imgshow':item.type === 'imgshow','widget-view-button':item.type === 'button'}">
        <div v-if="item.type === 'phone'" class="wg-phone">
          <div class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']">
            <div class="wg-title" v-show="item.showLabel">{{item.title}}</div>
            <div class="flex-auto">
              <input class="wg-input" v-model="item.value" :placeholder="item.placeholder">
            </div>
          </div>
          <div class="flex" v-if="item.showCode">
            <input placeholder="验证码" v-model="item.codeValue" class="wg-input flex-auto">
            <button class="getVerCode-btn">获取验证码</button>
          </div>
        </div>

        <div v-if="item.type === 'input'" class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']">
          <div class="wg-title" v-show="item.showLabel">{{item.title}}</div>
          <div class="flex-auto">
            <input v-model="item.value" :placeholder="item.placeholder" class="wg-input">
          </div>
        </div>

        <div v-if="item.type === 'checkbox'" class="wg-item flex-wrap wg-checkbox" :class="[item.labelPosition==='top'?'flex-column':'align-middle']">
          <div class="wg-title">{{item.title}}</div>
          <div class="flex-auto">
            <label class="label" v-for="(optionsItem, key) in item.options" :key="optionsItem + key">
              <input class="wg-checkbox-input" :type="item.isRadio?'radio':'checkbox'" :value="optionsItem" v-model="item.value" style="display:none">
              <span>{{optionsItem}}</span>
            </label>
          </div>
        </div>

        <div v-if="item.type === 'select'" class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']">
          <div class="wg-title" v-show="item.showLabel">{{item.title}}</div>
          <div class="flex-auto">
            <select v-model="item.value" class="wg-select">
              <option value disabled selected hidden>{{item.placeholder}}</option>
              <option v-for="item in item.options" :key="item" :value="item" :label="item.showLabel?item.label:item"></option>
            </select>
          </div>
        </div>

        <div v-if="item.type==='switch'" class="wg-item wg-switch" :class="[item.labelPosition==='top'?'flex-column':'align-middle']">
          <div class="wg-title">{{item.title}}</div>
          <label class="label">
            <input type="checkbox" class="wg-switch-input" v-model="item.value" style="display:none">
            <span class="wg-switch-core"></span>
          </label>
        </div>

        <div v-if="item.type === 'date'" class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']">
          <div class="wg-title">{{item.title}}</div>
          <div class="flex-auto">
            <input type="date" v-model="item.value" class="wg-input">
          </div>
        </div>

        <div v-if="item.type === 'imgshow'">
          <div class="flex flex-center">
            <img :src="item.value" alt="图片展示" width="100%">
          </div>
        </div>

        <div v-if="item.type === 'button'">
          <div class="flex flex-center">
            <button class="wg-button">{{item.btnText}}</button>
          </div>
        </div>

        <div v-if="item.type === 'staticText'" class="wg-staticText">
          <p class="text" :style="{textAlign:item.textAlign}">{{item.value}}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "widgetItems",
  props: {
    wgList: Array
  },
  data() {
    return {

    };
  },

  methods: {
    sandglass() {
      this.$loading.open({
        text: "加载中...",
        type: "sandglass"
      });
      setTimeout(() => {
        this.$loading.close();
      }, 3000);
    },
    snake() {
      this.$loading.open();
      setTimeout(() => {
        this.$loading.close();
      }, 2000);
    },
    tripleBounce() {
      this.$loading.open({
        text: "正在提交...",
        type: "triple-bounce"
      });
      setTimeout(() => {
        this.$loading.close();
      }, 3000);
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
@require '../assets/css/widget.styl';
</style>
