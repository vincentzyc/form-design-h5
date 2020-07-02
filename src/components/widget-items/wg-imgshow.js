import Utils from '../../utils'

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
    const imgWrapClass = link => ['flex', 'flex-center', Utils.isLink(link) ? 'cursor-pointer' : ''];

    return (
      <div style={Utils.formatStyle(item.style)}>
        {
          item.imglist ?
            <ul class="flex flex-wrap">
              {item.imglist.map((imgitem, index) => (
                <li key={index} class={[item.styleType === 'col1' ? 'col-12' : 'col-6']}>
                  <div
                    class={imgWrapClass(imgitem.link)}
                    onClick={() => Utils.jumpLink(imgitem.link)}
                  >
                    <img alt="图片" width="100%" {...{ directives: [{ name: 'lazy', value: imgitem.img }] }} />
                  </div>
                </li>
              ))}
            </ul> : null
        }

      </div>
    )
  }
}