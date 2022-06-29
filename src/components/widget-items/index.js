import WgPhone from "./wg-phone"
import WgInput from "./wg-input"
import WgCheckbox from "./wg-checkbox"
import WgSelect from "./wg-select"
import WgSwitch from "./wg-switch"
import WgDate from "./wg-date"
import WgImgShow from "./wg-imgshow"
import WgStaticText from "./wg-statictext"
import WgButton from "./wg-button"
import wgSplitLine from "./wg-splitLine"
import WgWechat from './wg-wechat'
import WgMarquee from './wg-marquee'
import WgAgreement from './wg-agreement'
import WgMarqueeSingle from './wg-marquee-single'
import WgVideoPlay from './wg-video-play'
import WgRandomCode from './wg-random-code'
import WgCountDown from './wg-count-down'


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
    WgWechat,
    WgMarquee,
    WgAgreement,
    WgMarqueeSingle,
    WgVideoPlay,
    WgRandomCode,
    WgCountDown
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
        imgSlide: () => import("./wg-imgslide"),
        hPicker: () => import("./wg-horizontal-picker"),
        wechat: 'WgWechat',
        marquee: 'WgMarquee',
        agreement: 'WgAgreement',
        marqueeSingle: 'WgMarqueeSingle',
        videoPlay: 'WgVideoPlay',
        randomCode: 'WgRandomCode',
        sms: () => import("./wg-sms"),
        countDown: () => import("./wg-count-down"),
      }
    }
  },
  render() {
    const Widget = this.wgNameMap[this.item.type];
    return (
      <div class="widget-view">
        <Widget item={this.item} />
      </div>
    )
  }
}