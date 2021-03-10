import Utils from '@/utils/index'
import { Swipe, SwipeItem } from 'vant';

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
    const wrapSlideStyle = { margin: item.style.margin },
      slideContentStyle = { width: '100%', maxWidth: '640px', height: Utils.changeRem(item.style.height + 'px') };
    const vantSwipeItem = item.value.map((v, i) => (
      <SwipeItem key={i}>
        <a href={v.url}>
          <img src={v.image} width="100%" height="100%" />
        </a>
      </SwipeItem>
    ))
    return (
      <div class="wg-imgslide">
        <div style={wrapSlideStyle}>
          <Swipe autoplay={item.interval} style={slideContentStyle}>
            {vantSwipeItem}
          </Swipe>
        </div>
      </div>
    )
  }
}