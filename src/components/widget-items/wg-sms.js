import { Dialog } from 'vant';
import Utils from '@/utils/index'

function clickBtn(smsBtn, item) {
  Dialog.confirm({
    ...item.dialog,
    message: `<p>${item.dialog.message}</p><p 
    style="margin-top:10px;color:#ac242e;font-size:${Utils.changeRem('12px')}"
    >温馨提示：若不能自动调起短信页面，请手动发送内容"${smsBtn.content}"到"${smsBtn.addressee}"</p>`,
  }).then(() => {
    if (Utils.isQQInternalBrowser()) return window.location.href = `sms:${smsBtn.addressee}`;
    if (Utils.checkDevice() === 'iOS' && Utils.isUCBrowser()) return window.location.href = `sms:${smsBtn.addressee}`
    if (Utils.checkDevice() === 'iOS') return window.location.href = `sms:${smsBtn.addressee}&body=${smsBtn.content}`;
    return window.location.href = `sms:${smsBtn.addressee}?body=${smsBtn.content}`;
  }).catch(() => { });
}

function getSmslist(h, item) {
  const liClass = [item.styleType === 'col1' ? 'col-12' : 'col-6'];
  return (
    <ul class="flex flex-wrap">
      {item.smslist.map((smsBtn, index) => (
        <li class={liClass} key={index}>
          <div class="flex flex-center" style={{ padding: Utils.changeRem(item.style.btnPadding) }}>
            {item.isImgBtn
              ? <img {...{ directives: [{ name: 'lazy', value: smsBtn.img }] }} alt="图片按钮" width="100%" onClick={() => clickBtn(smsBtn, item)} />
              : <button class="wg-button" style={Utils.formatStyle(item.style.btnStyle)} onClick={() => clickBtn(smsBtn, item)}>{smsBtn.btnText}</button>
            }
          </div>
        </li>
      ))}
    </ul>
  )
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
    return (
      <div class="wg-sms clearfix" style={item.style}>
        {getSmslist(h, item)}
      </div>
    )
  }
}