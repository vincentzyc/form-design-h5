import WidgetItems from "@/components/widget-items/index";
import '@/assets/css/widget.styl';

export default {
  name: "renderPage",
  components: {
    WidgetItems
  },
  props: {
    list: Array,
    fixedTop: {
      type: Array,
      default: () => []
    },
    fixedCustom: {
      type: Array,
      default: () => []
    },
    fixedBottom: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showFixedBottom: true,
      showFixedTop: true,
      backAlert: false
    };
  },
  computed: {
    isHijack() {
      return this.BUS.pageData?.hijackBack?.isHijack ? true : false
    }
  },
  methods: {
    fixedCustomStyle(item) {
      if (item.position) {
        return this.$util.formatStyle({
          width: item.style.width,
          top: item.position.top + 'px',
          [item.position.side]: item.position[item.position.side] + '%'
        })
      }
    },
    showFixed() {
      if (this.fixedBottom.length <= 0 && this.fixedTop.length <= 0) return
      let fbData = this.fixedBottom.length > 0 ? this.fixedBottom[0] : '';
      let ftData = this.fixedTop.length > 0 ? this.fixedTop[0] : '';
      if (Object.prototype.hasOwnProperty.call(fbData, 'scrollHeight')) this.showFixedBottom = fbData.scrollHeight === 0;
      if (Object.prototype.hasOwnProperty.call(ftData, 'scrollHeight')) this.showFixedTop = ftData.scrollHeight === 0;
      window.addEventListener('scroll', () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (Object.prototype.hasOwnProperty.call(fbData, 'scrollHeight')) this.showFixedBottom = scrollTop >= fbData.scrollHeight
        if (Object.prototype.hasOwnProperty.call(ftData, 'scrollHeight')) this.showFixedTop = scrollTop >= ftData.scrollHeight
      })
    },
    clickAlertImg(link) {
      let isLink = this.$util.isLink(link);
      if (!isLink) link = window.location.href;
      window.location.href = link;
    },
    hijackBack() {
      if (window.history.pushState) {
        window.history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.handleBack, false);
      }
    },
    handleBack() {
      this.backAlert = true;
      // console.log("点击了浏览器的返回按钮");
      // history.pushState(null, null, document.URL);
      // window.history.back();
    }
  },
  created() {
    this.showFixed();
    if (this.isHijack) this.hijackBack()
  },
  render() {
    const { BUS, list, fixedTop, showFixedTop, fixedCustom, fixedBottom, showFixedBottom } = this;

    const fixedTopNode = fixedTop.length > 0 ?
      <transition name="fade">
        <div v-show={showFixedTop} class="wg-fixed-top" style="max-width:640px">
          {fixedTop.map(ftItem => <WidgetItems item={ftItem} key={ftItem.key} />)}
        </div>
      </transition> : null

    const fixedCustomNode = fixedCustom.length > 0 ?
      <transition name="fade">
        <div ref="fixedCustom" class="wg-fixed-custom" style="max-width:640px">
          {fixedCustom.map(fcItem => <WidgetItems item={fcItem} key={fcItem.key} class="fixed-item" style={this.fixedCustomStyle(fcItem)} />)}
        </div>
      </transition> : null

    const fixedBottomNode = fixedBottom.length > 0 ?
      <transition name="fade">
        <div v-show={showFixedBottom} class="wg-fixed-bottom" style="max-width:640px">
          {fixedBottom.map(fbItem => <WidgetItems item={fbItem} key={fbItem.key} />)}
        </div>
      </transition> : null


    const listNode = list.length > 0 ?
      list.map(item => item.type === 'formList' ?
        <div
          key={item.key}
          class="widget-form-list"
          style={this.$util.formatStyle(item.style)}
        >
          {item.list.map(formItem => <WidgetItems ref="wgList" key={formItem.key} item={formItem} />)}
        </div>
        : <WidgetItems ref="wgList" item={item} key={item.key} />
      ) : []

    const backDialog = this.isHijack ?
      <van-dialog
        vModel={this.backAlert}
        get-container="body"
        showConfirmButton={false}
        style="{'background-color': 'transparent'}"
      >
        <img
          src={BUS.pageData.hijackBack.alertImg}
          alt="监听到返回"
          class="flex"
          width="100%"
          onClick={() => this.clickAlertImg(BUS.pageData.hijackBack.alertLink)}
        />
      </van-dialog> : null


    return (
      <div class="widget-list">
        {fixedTopNode}
        {fixedCustomNode}
        {...listNode}
        {fixedBottomNode}
        {backDialog}
      </div>
    )
  }
}