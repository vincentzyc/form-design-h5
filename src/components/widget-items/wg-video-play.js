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
    return (
      <div class="wg-video-play" style={Utils.formatStyle(item.style)}>
        <video attrs={item.videoAttr} style="width:100%;height:100%">您的浏览器不支持视频播放哦~</video>
      </div>
    )
  }
}
