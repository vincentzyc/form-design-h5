export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPhone(item) {
      const phoneClass = [item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle']
      return (
        <div class="wg-item" class={phoneClass}>
          <div
            v-show={item.showLabel}
            class="wg-title flex-none"
            style={{ width: this.$util.changeRem(item.label.labelwidth) }}
          >{item.label.labelTitle}</div>
          <div class="flex-auto">
            <input
              id={item.key}
              class="wg-input"
              type="tel"
              maxlength="11"
              vModel_trim={item.value}
              placeholder={item.placeholder}
            />
          </div>
        </div>
      )
    },
    getValidateCode(item) {
      const codeClass = [item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle']
      return item.showCode && (
        <div class="wg-item" class={codeClass}>
          <div
            v-show={item.showLabel}
            class="wg-title flex-none"
            style={{ width: this.$util.changeRem(item.label.labelwidth) }}
          >验证码</div>
          <div class="flex flex-auto flex-center">
            <input placeholder="验证码" type="tel" maxlength="6" vModel_trim={item.codeValue} class="wg-input flex-auto" />
            <ValidateCodeBtn phone={item.value} style={this.$util.formatStyle(item.style.btnStyle)} />
          </div>
        </div>
      )
    }
  },
  render() {
    const { item } = this
    return (
      <div class="wg-phone" style={this.$util.formatStyle(item.style)}>
        {this.getPhone(item)}
        {this.getValidateCode(item)}
      </div>
    )
  }
}