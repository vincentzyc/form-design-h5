export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  render() {
    return (
      <div class="wg-video-play" style={this.$util.formatStyle(this.item.style)}>
        <video attrs={{ ...this.item.videoAttr }} style="width:100%;height:100%">您的浏览器不支持视频播放哦~</video>
      </div>
    )
  }
}