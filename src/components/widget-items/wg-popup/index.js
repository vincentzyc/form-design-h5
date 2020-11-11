import WidgetItems from "@/components/widget-items/index";
import './css/style.styl'

export default {
  name: "CustomPopup",
  components: {
    WidgetItems
  },
  props: {
    list: Array,
    value: Boolean
  },
  computed: {
    model: {
      get() {
        if (this.value) this.BUS.setValiPopupDate(true)
        return this.value;
      },
      set(val) {
        this.BUS.setValiPopupDate(false)
        this.$emit("input", val);
      }
    }
  },
  methods: {
    open() {
      this.model = true
    },
    close() {
      this.model = false
      this.$emit('close')
    }
  },
  render() {
    const { list } = this
    const listNode = list.length > 0
      ? list.map(item => <WidgetItems ref="wgList" item={item} key={item.key} />)
      : []
    return (
      <van-popup vModel={this.model} class="custom-popup" style="max-width:576px;">
        {/*style="max-width:576px; overflow: visible;" */}
        {/* <svg class="close-icon" viewBox="0 0 1024 1024" onClick={() => this.close()}><path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-981.333333a469.333333 469.333333 0 1 0 469.333333 469.333333A469.333333 469.333333 0 0 0 512 42.666667z m207.402667 676.437333a20.224 20.224 0 0 1-28.629334 0l-178.944-178.944-178.944 178.944a20.245333 20.245333 0 1 1-28.629333-28.629333l178.944-178.944-178.645333-178.645334a20.245333 20.245333 0 0 1 28.629333-28.629333l178.645333 178.645333 178.645334-178.645333a20.245333 20.245333 0 1 1 28.629333 28.629333l-178.645333 178.645334 178.944 178.944a20.224 20.224 0 0 1 0 28.629333z" fill="#ffffff"></path></svg> */}
        <div class="popup-wrap">
          {...listNode}
        </div>
        {/* <div class="agreement-confirm" onClick={() => this.close()}>我知道了</div> */}
      </van-popup>
    )
  }
}