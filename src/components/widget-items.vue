<template>
  <div class="hello">
    <template v-for="item in wgList">
      <div class="widget-view" :key="item.key" :class="{'widget-view-imgshow':item.type === 'imgshow','widget-view-button':item.type === 'button'}">
        <div v-if="item.type === 'input'" class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']">
          <div class="wg-title" v-show="item.showLabel">{{item.title}}</div>
          <div class="flex-auto">
            <input v-model="item.value" :placeholder="item.placeholder" class="wg-input">
          </div>
        </div>

        <div v-if="item.type === 'checkbox'" class="wg-item flex-wrap wg-checkbox" :class="[item.labelPosition==='top'?'flex-column':'align-middle']">
          <div class="wg-title">{{item.title}}</div>
          <div class="flex-auto">
            <label class="label" v-for="(optionsItem, key) in item.options" :key="optionsItem.value + key">
              <input
                class="wg-checkbox-input"
                :type="item.isRadio?'radio':'checkbox'"
                :value="optionsItem.value"
                v-model="item.value"
                style="display:none"
              >
              <span>{{optionsItem.value}}</span>
            </label>
          </div>
        </div>

        <div v-if="item.type === 'select'" class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']">
          <div class="wg-title" v-show="item.showLabel">{{item.title}}</div>
          <div class="flex-auto">
            <select v-model="item.value" class="wg-select">
              <option value disabled selected hidden>{{item.placeholder}}</option>
              <option v-for="item in item.options" :key="item.value" :value="item.value" :label="item.showLabel?item.label:item.value"></option>
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
      </div>
    </template>
    <!-- <cube-button @click="sandglass()">sandglass-loading</cube-button>
    <cube-button type="submit" @click="snake()">snake-loading</cube-button>
    <cube-button :active="true" @click="tripleBounce()">triple-bounce-loading</cube-button>
    <cube-button icon="cubeic-right" @click="goAbouot()">goAbouot</cube-button>
    <cube-button :light="true" @click="showBlandList()">showBlandList</cube-button>
    <cube-button :inline="true" @click="showCarType()">showCarType</cube-button>
    <cube-button :outline="true" @click="showBuyTime()">showBuyTime</cube-button>
    <cube-button :primary="true" @click="axiosPost()">axiosPost</cube-button>
    <cube-checkbox-group v-model="buttonStyle" :horizontal="true">
      <cube-checkbox label="inline">Inline</cube-checkbox>
      <cube-checkbox label="outline">Outline</cube-checkbox>
      <cube-checkbox label="primary">Primary</cube-checkbox>
    </cube-checkbox-group>
    <cube-button :inline="inlineStyle" :outline="outlineStyle" :primary="primaryStyle">Demo Button</cube-button>
    <cube-button :disabled="true">Disabled Button</cube-button>-->
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
      // wgList: [],
      buttonStyle: ["inline", "outline", "primary"],
      // blandList: jsonData.blandList,
      // carType: jsonData.carType,
      // buyTime: jsonData.buyTime
    };
  },
  computed: {
    inlineStyle() {
      return this.buttonStyle.indexOf("inline") >= 0;
    },
    outlineStyle() {
      return this.buttonStyle.indexOf("outline") >= 0;
    },
    primaryStyle() {
      return this.buttonStyle.indexOf("primary") >= 0;
    }
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
    goAbouot() {
      this.$router.push("/about");
    },
    showBlandList() {
      if (!this.blandPicker) {
        this.blandPicker = this.$createPicker({
          title: "请选择品牌",
          data: [this.blandList],
          onSelect: selectedVal => {
            console.log(selectedVal);
          }
          // onCancel: this.cancelHandle
        });
      }
      this.blandPicker.show();
    },
    showCarType() {
      if (!this.carPicker) {
        this.carPicker = this.$createPicker({
          title: "请选择车型",
          data: [this.carType],
          onSelect: selectedVal => {
            console.log(selectedVal);
          }
          // onCancel: this.cancelHandle
        });
      }
      this.carPicker.show();
    },
    showBuyTime() {
      if (!this.buyTimePicker) {
        this.buyTimePicker = this.$createPicker({
          title: "请选择购车时间",
          data: [this.buyTime],
          onSelect: selectedVal => {
            console.log(selectedVal);
          }
          // onCancel: this.cancelHandle
        });
      }
      this.buyTimePicker.show();
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
