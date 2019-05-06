<template>
  <div>
    <template v-for="item in wgList">
      <div class="widget-view" :key="item.key" :class="{'widget-view-imgShow':item.type === 'imgShow','widget-view-button':item.type === 'button'}">
        <!-- 手机 -->
        <WgPhone v-if="item.type === 'phone'" :ref="item.key" :item="item"/>

        <!-- 输入框 -->
        <WgInput v-if="item.type === 'input'" :ref="item.key" :item="item"/>

        <!-- 选择框 -->
        <WgCheckbox v-if="item.type === 'checkbox'" :ref="item.key" :item="item"/>

        <!-- 下拉选择 -->
        <WgSelect v-if="item.type === 'select'" :ref="item.key" :item="item"/>

        <!-- 开关 -->
        <WgSwitch v-if="item.type === 'switch'" :ref="item.key" :item="item"/>

        <!-- 日期选择 -->
        <WgDate v-if="item.type === 'date'" :ref="item.key" :item="item"/>

        <!-- 横向滑动自动选择 -->
        <WgHorizontalPicker v-if="item.type === 'h-picker'" :ref="item.key" :item="item"/>

        <!-- 图片展示 -->
        <div v-if="item.type === 'imgShow'&&item.value" class="wg-imgshow">
          <div :style="item.style">
            <div class="flex flex-center">
              <img :src="item.value" alt="图片展示" width="100%">
            </div>
          </div>
        </div>

        <!-- 图片轮播 -->
        <div v-if="item.type === 'imgSlide'" class="wg-imgslide">
          <div :style="{margin:item.style.margin}">
            <div :style="{width:'100%',height:item.style.height/88.88+'rem'}">
              <cube-slide :ref="item.key" :data="item.value" :interval="item.interval" style="max-width:640px">
                <cube-slide-item v-for="(images, index) in item.value" :key="index">
                  <a :href="images.url">
                    <img :src="images.image" width="100%">
                  </a>
                </cube-slide-item>
              </cube-slide>
            </div>
          </div>
        </div>

        <!-- 按钮 -->
        <div v-if="item.type === 'button'" :style="item.style">
          <div class="flex flex-center">
            <button class="wg-button" :style="item.style.btnStyle" @click="clickBtn(item)">{{item.btnText}}</button>
          </div>
        </div>

        <!-- 文本描述 -->
        <div v-if="item.type === 'staticText'" class="wg-staticText">
          <p :style="item.style">{{item.value}}</p>
        </div>

        <!-- 分割线 -->
        <div v-if="item.type === 'splitLine'" class="wg-splitLine">
          <hr class="splitLine-hr" :style="item.style">
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
import WgHorizontalPicker from "./wg-horizontal-picker"
export default {
  name: "widgetItems",
  components: {
    WgPhone,
    WgInput,
    WgCheckbox,
    WgSelect,
    WgSwitch,
    WgDate,
    WgHorizontalPicker
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
          this.$parent.clickSubmit();
          break;

        default:
          break;
      }
    },
    valiAllDate() {
      let flag = true;
      for (const item of this.wgList) {
        if (!Array.isArray(this.$refs[item.key])) continue;
        if (typeof this.$refs[item.key][0].validate !== 'function') {
          this.formatParam(item);
          continue;
        }
        let result = this.$refs[item.key][0].validate();
        if (result === true) {
          this.formatParam(item);
          continue
        }
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@require '../../assets/css/widget.styl';
@require '../../assets/css/themes.styl';
</style>
