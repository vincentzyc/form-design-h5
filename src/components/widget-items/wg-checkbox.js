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
    const wrapClass = ['wg-item', 'flex-wrap', 'wg-checkbox', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle'];
    return (
      <div class={wrapClass} style={item.style}>
        <div class="wg-title" style={{ width: Utils.changeRem(item.label.labelwidth) }}>{item.label.labelTitle}</div>
        <div class="flex-auto" id={item.key}>
          {item.options.map((optionsItem, key) => (
            <label class="label" key={optionsItem + key}>
              <input
                class="wg-checkbox-input"
                type={item.isRadio ? 'radio' : 'checkbox'}
                value={optionsItem}
                vModel={item.value}
                style="display:none"
              />
              <span>{optionsItem}</span>
            </label>
          ))}
        </div>
      </div>
    )
  }
}