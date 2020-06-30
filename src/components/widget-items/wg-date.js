import Utils from '../../utils'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  render() {
    const { item } = this;
    const wrapClass = ['wg-item', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle']
    return (
      <div class={wrapClass} style={item.style}>
        <div class="wg-title" style={{ width: Utils.changeRem(item.label.labelWidth) }}>{item.label.labelTitle}</div>
        <div class="flex-auto">
          <input type="date" vModel={item.value} class="wg-input" id={item.key} />
        </div>
      </div>
    )
  }
}