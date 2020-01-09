<template>
  <div class="widget-view" :key="item.key">
    <!-- 手机 -->
    <WgPhone v-if="item.type === 'phone'" :ref="item.key" :item="item" class="wg-padding" />

    <!-- 输入框 -->
    <WgInput v-if="item.type === 'input'" :ref="item.key" :item="item" class="wg-padding" />

    <!-- 选择框 -->
    <WgCheckbox v-if="item.type === 'checkbox'" :ref="item.key" :item="item" class="wg-padding" />

    <!-- 下拉选择 -->
    <WgSelect v-if="item.type === 'select'" :ref="item.key" :item="item" class="wg-padding" />

    <!-- 开关 -->
    <WgSwitch v-if="item.type === 'switch'" :ref="item.key" :item="item" class="wg-padding" />

    <!-- 日期选择 -->
    <WgDate v-if="item.type === 'date'" :ref="item.key" :item="item" class="wg-padding" />

    <!-- 横向滑动自动选择 -->
    <WgHorizontalPicker v-if="item.type === 'h-picker'" :ref="item.key" :item="item" class="wg-padding" />

    <!-- 图片展示 -->
    <WgImgshow v-if="item.type === 'imgShow'" :item="item" />

    <!-- 图片轮播 -->
    <wgImgSlide v-if="item.type === 'imgSlide'" :item="item" class="wg-padding"/>

    <!-- 按钮 -->
    <WgButton v-if="item.type === 'button'" :item="item" />

    <!-- 文本描述 -->
    <WgStaticText v-if="item.type === 'staticText'" :item="item"/>

    <!-- 分割线 -->
    <wgSplitLine v-if="item.type === 'splitLine'" :item="item" class="wg-padding"/>

    <!-- 微信关注 -->
    <WgWechat v-if="item.type === 'wechat'" :item="item" />
  </div>
</template>

<script>
import WgPhone from "./wg-phone"
import WgInput from "./wg-input"
import WgCheckbox from "./wg-checkbox"
import WgSelect from "./wg-select"
import WgSwitch from "./wg-switch"
import WgDate from "./wg-date"
import wgImgSlide from "./wg-imgslide"
import WgStaticText from "./wg-statictext"
import WgButton from "./wg-button"
import wgSplitLine from "./wg-splitLine"
import WgImgshow from "./wg-imgshow"
import WgHorizontalPicker from "./wg-horizontal-picker"
import WgWechat from './wg-wechat'


export default {
  name: "widgetItems",
  components: {
    WgPhone,
    WgInput,
    WgCheckbox,
    WgSelect,
    WgSwitch,
    WgDate,
    WgButton,
    wgSplitLine,
    WgStaticText,
    WgImgshow,
    wgImgSlide,
    WgHorizontalPicker,
    WgWechat
  },
  props: {
    item:{
      type:Object,
      required:true
    }
  }
};
</script>
