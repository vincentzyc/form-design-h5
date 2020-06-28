import Utils from '../../utils'

function jumpH5(link) {
  let isLink = Utils.isLink(link);
  if (!isLink) return;
  window.location.href = link
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
    const domStyle = {
      backgroundColor: item.backgroundColor,
      backgroundImage: item.backgroundImage ? `url(${item.backgroundImage})` : null
    }
    return (
      <div
        class="wg-staticText clearfix"
        onClick={() => jumpH5(item.link)}
        style={domStyle}
      >
        <p style={Utils.formatStyle(item.style)} domPropsInnerHTML={Utils.changeRem(item.value)}></p>
      </div>
    )
  }
}