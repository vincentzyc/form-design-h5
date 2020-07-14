
import Utils from '@/utils/index'
import { Checkbox } from 'vant';
import AgreementPopup from './agreement-popup.vue'
export default {
  components: {
    "agreement-popup": AgreementPopup,
    "van-checkbox": Checkbox
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    openAgreement(title, text) {
      this.$refs.agreement.open(text);
    },
    getAgreementList(h, item) {
      return (
        <van-checkbox vModel={item.value} style={Utils.formatStyle(item.style)} shape="square">
          <p style={{ color: item.style.color }}>
            <span>{item.tipText}</span>
            {item.titleTexts.map((titleText, key) => (
              <span key={key}>
                {key > 0 && <span>和</span>}
                {titleText.title && (
                  <span
                    style={{ color: item.agreementColor }}
                    onClick={e => { e.stopPropagation(); this.openAgreement(titleText.title, titleText.text) }}
                  >{titleText.title}</span>
                )}
              </span>
            ))}
          </p>
        </van-checkbox>
      )
    }
  },
  render(h) {
    const { item } = this
    return (
      <div class="wg-agreement clearfix" id={item.key}>
        {this.getAgreementList(h, item)}
        <agreement-popup ref="agreement" />
      </div>
    )
  }
}