

import Utils from '@/utils/index'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      marqueeWidth: 0
    }
  },
  computed: {
    imgStyle() {
      return {
        width: this.marqueeWidth + 'px',
        height: this.item.direction === 'left' ? Utils.changeRem(this.item.style.height) : 'auto'
      }
    },
    inlineClass() {
      return this.item.direction === 'left' ? ['wg-marquee-left', 'flex-inline'] : ['wg-marquee-up']
    },
    inlineStyle() {
      return {
        animation: `marquee-${this.item.direction} ${this.item.durationTime}s 0.2s linear infinite`
      }
    }
  },
  methods: {
    getImgDom(h, item) {
      return item.imgUrl && (
        <div class={this.inlineClass} style={this.inlineStyle}>
          <img src={item.imgUrl} alt="图片" style={this.imgStyle} />
          <img src={item.imgUrl} alt="图片" style={this.imgStyle} />
        </div>
      )
    },
    geTextDom(h, item) {
      return (
        <div class={this.inlineClass} style={this.inlineStyle}>{
          [...item.textList, ...item.textList].map((texts, key) => (
            <p key={key} class="flex space-around" style={{ width: this.marqueeWidth + 'px' }}
            >
              {texts.split(/\s+/).map((text, i) => (
                <span key={i}>{text}</span>
              ))}
            </p>
          ))}
        </div>
      )
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.marqueeWidth = this.$refs.wgMarquee.offsetWidth || this.$refs.wgMarquee.clientWidth;
      }, 10);
    })
  },
  render(h) {
    const { item } = this
    const wrapClass = ['wg-marquee', { 'flex align-middle': this.item.direction === 'left' }];
    return (
      <div
        ref="wgMarquee"
        class={wrapClass}
        style={Utils.formatStyle(item.style)}
      >
        {item.isImgBtn ? this.getImgDom(h, item) : this.geTextDom(h, item)}
      </div>
    )
  }
}