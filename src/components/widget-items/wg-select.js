import Utils from '@/utils/index'
import { Picker } from 'vant';

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showPicker: false
    }
  },
  methods: {
    openPicker() {
      this.showPicker = true
    },
    closePicker() {
      this.showPicker = false
    },
    onConfirm(value) {
      this.item.value = value;
      this.showPicker = false
    }
  },
  render() {
    const { item } = this;
    const wrapClass = ['wg-item', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle'];
    return (
      <div class={wrapClass} style={item.style}>
        <div
          class="wg-title"
          v-show={item.showLabel}
          style={{ width: Utils.changeRem(item.label.labelwidth) }}
        >{item.label.labelTitle}</div>
        <div class="flex-auto disabled-input" onClick={this.openPicker}>
          <input
            disabled
            id={item.key}
            vModel={item.value}
            placeholder={item.placeholder}
            class="wg-input" />
          <i class="cubeic-select"></i>
        </div>
        <van-popup v-model={this.showPicker} round position="bottom">
          <Picker
            show-toolbar
            columns={this.item.options}
            onCancel={this.closePicker}
            onConfirm={this.onConfirm}
          />
        </van-popup>
      </div>
    )
  }
}
