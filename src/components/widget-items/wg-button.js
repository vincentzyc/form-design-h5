import { handleSubmit } from "@/validate/index"
import Utils from '@/utils/index'

function clickBtn(item) {
  switch (item.btnType) {
    case 'submit':
      handleSubmit()
      break;
    default:
      break;
  }
}

export default {
  functional: true,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  render(h, context) {
    const { item } = context.props;
    const children = item.style.isImgBtn ?
      <img src={item.style.value} alt="图片按钮" width="100%" onClick={() => clickBtn(item)} />
      : <button
        class="wg-button"
        style={Utils.formatStyle(item.style.btnStyle)}
        onClick={() => clickBtn(item)}
      >{item.btnText}</button>
    return (
      <div class="flex flex-center" style={Utils.formatStyle(item.style)}>
        {children}
      </div >
    )
  }
}

