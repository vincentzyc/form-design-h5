import Utils from '../../utils'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  render() {
    const { item } = this
    const wrapClass = ['wg-item', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle']
    return (
      <div class={wrapClass} style={item.style}>
        <div
          class="wg-title"
          v-show={item.showLabel}
          style={{ width: Utils.changeRem(item.label.labelWidth) }}
        >{item.label.labelTitle}</div>
        <div class="flex-auto">
          <input vModel={item.value} placeholder={item.placeholder} class="wg-input" id={item.key} />
        </div>
      </div>
    )
  }
}
