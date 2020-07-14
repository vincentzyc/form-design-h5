import Utils from '@/utils/index'
import { Checkbox } from 'vant';
import AgreementPopup from './agreement-popup'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    openAgreement(text, event) {
      event.stopPropagation();
      this.$refs.agreement.open(text);
    },
    getAgreementList(h, item) {
      return (
        <Checkbox vModel={item.value} style={Utils.formatStyle(item.style)} shape="square">
          <p style={{ color: item.style.color }}>
            <span>{item.tipText}</span>
            {item.titleTexts.map((titleText, key) => (
              <span key={key}>
                {key > 0 && <span>和</span>}
                {titleText.title && (
                  <span
                    style={{ color: item.agreementColor }}
                    onClick={event => this.openAgreement(titleText.text, event)}
                  >{titleText.title}</span>
                )}
              </span>
            ))}
          </p>
        </Checkbox>
      )
    }
  },
  render(h) {
    const { item } = this
    return (
      <div class="wg-agreement clearfix" id={item.key}>
        {this.getAgreementList(h, item)}
        <AgreementPopup ref="agreement" />
      </div>
    )
  }
}