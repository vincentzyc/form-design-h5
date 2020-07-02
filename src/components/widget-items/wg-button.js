import { handleSubmit } from "../../validate"
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    clickBtn(item) {
      switch (item.btnType) {
        case 'submit':
          handleSubmit()
          break;
        default:
          break;
      }
    }
  },
  render() {
    const { item } = this;
    const children = item.style.isImgBtn ?
      <img src={item.style.value} alt="图片按钮" width="100%" onClick={() => this.clickBtn(item)} />
      : <button
        class="wg-button"
        style={this.$util.formatStyle(item.style.btnStyle)}
        onClick={() => this.clickBtn(item)}
      >{item.btnText}</button>
    return (
      <div class="flex flex-center" style={this.$util.formatStyle(item.style)}>
        {children}
      </div >
    )
  }
}

