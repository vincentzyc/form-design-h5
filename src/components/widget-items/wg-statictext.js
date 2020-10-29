import Utils from '@/utils/index'
import CustomPopup from './wg-popup'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      if (this.item.link) return Utils.jumpLink(this.item.link)
      if (this.item.popupList?.length > 0) {
        this.$refs.customPopup.open();
      }
    }
  },
  render() {
    const { item } = this;
    const domStyle = {
      backgroundColor: item.backgroundColor,
      backgroundImage: item.backgroundImage ? `url(${item.backgroundImage})` : null
    }
    return (
      <div
        class="wg-staticText clearfix"
        style={domStyle}
      >
        <p style={Utils.formatStyle(item.style)} domPropsInnerHTML={Utils.changeRem(item.value)} onClick={() => this.handleClick()}></p>
        <CustomPopup ref="customPopup" list={item.popupList} />
      </div>
    )
  }
}