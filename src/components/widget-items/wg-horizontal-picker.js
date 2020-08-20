import Utils from '@/utils/index'
import HorizontalPicker from "@/components/base/horizontal-picker"

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  render() {
    const { item } = this;
    const wrapClass = ['wg-item', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle'],
      titleStyle = { width: Utils.changeRem(item.label.labelwidth) }
    return (
      <div id={item.key} class={wrapClass} style={item.style}>
        <div class="wg-title" style={titleStyle}>{item.label.labelTitle}</div>
        <div class="flex-auto" id={item.key}>
          <HorizontalPicker
            vModel={item.value}
            style="margin: 0 auto;"
            data={item.options}
            pickerStyle={item.pickerStyle}
            itemWidth={item.itemWidth}
            showNumber={item.showNumber}
          ></HorizontalPicker>
        </div>
      </div>
    )
  }
}