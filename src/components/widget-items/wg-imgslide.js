import Utils from '@/utils/index'

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
      slideContentStyle = { width: '100%', height: Utils.changeRem(item.style.height + 'px') };
    const cubeSlideItem = item.value.map((v, i) => (
      <cube-slide-item key={i}>
        <a href={v.url}>
          <img src={v.image} width="100%" />
        </a>
      </cube-slide-item>
    ))
    return (
      <div class="wg-imgslide">
        <div style={wrapSlideStyle}>
          <div style={slideContentStyle}>
            <cube-slide ref={item.key} data={item.value} interval={item.interval} style="max-width:640px">
              {cubeSlideItem}
            </cube-slide>
          </div>
        </div>
      </div>
    )
  }
}