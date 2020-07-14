// 弹框组件（支持iframe嵌入页面）
// 使用例子： <AgreementPopup ref="agreement" />
// 打开弹框：this.$refs.agreement.open(text);
import Utils from '@/utils/index'
import './css/style.styl'
export default {
  name: "AgreementPopup",
  data() {
    return {
      showAgreement: false,
      text: ""
    }
  },
  computed: {
    isLinkText() {
      return this.$util.isLink(this.text)
    }
  },
  methods: {
    open(text) {
      this.text = text || "";
      this.showAgreement = true;
    },
    close() {
      this.showAgreement = false;
      this.$emit('close')
    }
  },
  render() {
    const { text, isLinkText } = this
    return (
      <van-popup vModel={this.showAgreement} class="agreement-popup" style="max-width:576px;">
        <div class="agreement-wrap">
          {
            isLinkText
              ? <iframe src={text} frameborder="0" style="width: 100%;height: 100%;"></iframe>
              : <p class="agreement-text" domPropsInnerHTML={Utils.textBr(text)}></p>
          }
        </div>
        <div class="agreement-confirm" onClick={() => this.close()}>我知道了</div>
      </van-popup>
    )
  }
}