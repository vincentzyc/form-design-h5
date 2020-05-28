<template>
  <div class="widget-view" :key="item.key">
    <component :is="wgNameMap[item.type]" :item="item" />
  </div>
</template>

<script>
import WgPhone from "./wg-phone"
import WgInput from "./wg-input"
import WgCheckbox from "./wg-checkbox"
import WgSelect from "./wg-select"
import WgSwitch from "./wg-switch"
import WgDate from "./wg-date"
import WgImgShow from "./wg-imgshow"
import wgImgSlide from "./wg-imgslide"
import WgStaticText from "./wg-statictext"
import WgButton from "./wg-button"
import wgSplitLine from "./wg-splitLine"
import WgHorizontalPicker from "./wg-horizontal-picker"
import WgWechat from './wg-wechat'
import WgMarquee from './wg-marquee'
import WgAgreement from './wg-agreement'
import WgMarqueeSingle from './wg-marquee-single'

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
    WgImgShow,
    wgImgSlide,
    WgHorizontalPicker,
    WgWechat,
    WgMarquee,
    WgAgreement,
    WgMarqueeSingle
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      wgNameMap: {
        phone: 'WgPhone',
        input: 'WgInput',
        checkbox: 'WgCheckbox',
        select: 'WgSelect',
        switch: 'WgSwitch',
        date: 'WgDate',
        button: 'WgButton',
        splitLine: 'wgSplitLine',
        staticText: 'WgStaticText',
        imgShow: 'WgImgShow',
        imgSlide: 'wgImgSlide',
        hPicker: 'WgHorizontalPicker',
        wechat: 'WgWechat',
        marquee: 'WgMarquee',
        agreement: 'WgAgreement',
        marqueeSingle: 'WgMarqueeSingle'
      }
    }
  }
};
</script>
