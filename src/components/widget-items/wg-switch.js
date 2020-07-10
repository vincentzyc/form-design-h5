import Utils from '@/utils/index'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  render() {
    const { item } = this;
    const wrapClass = ['wg-item', 'wg-switch', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle']
    return (
      <div class={wrapClass} style={item.style}>
        <div class="wg-title" style={{ width: Utils.changeRem(item.label.labelWidth) }}>{item.label.labelTitle}</div>
        <label class="label" id={item.key}>
          <input type="checkbox" vModel={item.value} class="wg-switch-input" style="display:none" />
          <span class="wg-switch-core"></span>
        </label>
      </div>
    )
  }
}

