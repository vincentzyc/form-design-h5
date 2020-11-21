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

function getChildren(h, item) {
  return item.style.isImgBtn
    ? <img src={item.style.value} alt="图片按钮" width="100%" onClick={() => clickBtn(item)} />
    : <button
      class="wg-button"
      style={Utils.formatStyle(item.style.btnStyle)}
      onClick={() => clickBtn(item)}
    >{item.btnText}</button>
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
    const wrapStyle = () => {
      if (!item.animation) return Utils.formatStyle(item.style)
      return Utils.formatStyle({
        ...item.style,
        ...item.animation
      })
    }
    const animteStyle = () => {
      if (!item.animation?.className) return { display: 'none' }
      return {
        ...item.animation,
        animationName: item.animation.className
      }
    }
    const wrapClass = () => {
      if (!item.animation) return ''
      return item.animation.className
    }
    return (
      <div class="flex flex-center" class={wrapClass()} style={wrapStyle()}>
        <span style={animteStyle()} class="animte-el"></span>
        {getChildren(h, item)}
      </div >
    )
  }
}

