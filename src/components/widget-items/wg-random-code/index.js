import createCode from './random-code'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCode() {
      let randomData = createCode()
      this.item.codeValue = randomData.code;
      this.item.style.btnStyle.fontFamily = randomData.font;
    }
  },
  created() {
    this.getCode()
    this.$set(this.item, 'getCode', this.getCode)
  },
  render() {
    const { item, $util } = this;
    const directionClass = item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle';

    return (
      <div class="wg-random-code" style={$util.formatStyle(item.style)}>
        <div class={['wg-item', directionClass]}>
          <div
            class="wg-title flex-none"
            v-show={item.showLabel}
            style={{ width: $util.changeRem(item.label.labelWidth) }}
          >{item.label.labelTitle}</div>
          <div class="flex flex-auto align-middle">
            <input placeholder={item.placeholder} type="text" maxlength="4" vModel_trim={item.value} class="wg-input flex-auto" />
            <button class="random-code flex-none" style={$util.formatStyle(item.style.btnStyle)} onClick={() => this.getCode()}>{item.codeValue}</button>
          </div>
        </div>
      </div>
    )
  }
}

