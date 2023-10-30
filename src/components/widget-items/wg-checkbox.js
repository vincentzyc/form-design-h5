import Utils from '@/utils/index';
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  render() {
    const { item } = this;
    const wrapClass = [
      'wg-item',
      'flex-wrap',
      'wg-checkbox',
      item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle',
    ];
    return (
      <div class={wrapClass} style={Utils.formatStyle(item.style)}>
        <div class="wg-title" style={{ width: Utils.changeRem(item.label.labelWidth) }}>
          {item.label.labelTitle}
        </div>
        <div class="flex-auto" id={item.key}>
          {item.options.map((optionsItem, key) => (
            <label class="label" key={optionsItem + key}>
              {item.isRadio ? (
                <input
                  class="wg-checkbox-input"
                  value={optionsItem}
                  vModel={item.value}
                  style="display:none"
                  type="radio"
                />
              ) : (
                <input
                  class="wg-checkbox-input"
                  value={optionsItem}
                  vModel={item.value}
                  style="display:none"
                  type="checkbox"
                />
              )}
              <span>{optionsItem}</span>
            </label>
          ))}
        </div>
      </div>
    );
  },
};
