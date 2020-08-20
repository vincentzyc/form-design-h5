export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    copy() {
      this.$copyText(this.item.wechatName).then(() => {
        this.$dialog.alert({
          title: '复制成功',
          message: '请在微信粘贴搜索'
        }).then(() => this.confirm())
      }, () => {
        this.$dialog.alert({
          title: '很抱歉',
          message: '您的浏览器不支持自动复制公众号，请手动复制后打开微信搜索'
        })
      })
    },
    confirm() {
      if (this.$util.isWechat()) return;
      window.location.href = "weixin://"
    },
    getImgBtn(item) {
      return (
        <div class="flex flex-center" onClick={() => this.copy()} style={this.$util.formatStyle(item.style)}>
          <img src={item.style.value} alt="图片按钮" width="100%" />
        </div>
      )
    },
    getWechat(item) {
      return (
        <div class="flex align-middle wg-wechat-wrap" style={this.$util.formatStyle(item.style)}>
          {this.getLogo(item)}
          {this.getWechatName(item)}
          <div
            class={['wechat-btn', item.showName ? 'flex-none' : 'flex-auto']}
            style={this.$util.formatStyle(item.style.btnStyle)}
            onClick={() => this.copy()}
          >{item.btnText}</div>
        </div>
      )
    },
    getLogo(item) {
      return item.showLogo && (
        <div class="wechat-avatar flex-none">
          {item.logo
            ? <img src={item.logo} alt="公众号logo" width="100%" />
            : <img src={require('@/assets/img/wxlogo.png')} alt="公众号logo" width="100%" />}
        </div>
      )
    },
    getWechatName(item) {
      return item.showName && <div class="flex-auto">{item.value}</div>
    }
  },
  render() {
    const { item } = this
    return (
      <div class="wg-wechat clearfix" style={{ backgroundColor: item.backgroundColor }}>
        {item.style.isImgBtn ? this.getImgBtn(item) : this.getWechat(item)}
      </div>
    )
  }
}