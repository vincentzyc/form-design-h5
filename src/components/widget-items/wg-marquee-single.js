export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      animate: false,
      animateTimeId: '',
      scrollTimeId: ''
    }
  },
  methods: {
    scroll() {
      if (this.animate) return;
      clearTimeout(this.animateTimeId);
      this.animate = true;
      this.animateTimeId = setTimeout(() => {
        this.item.textList.push(this.item.textList[0]);
        this.item.textList.shift();
        this.animate = false;
      }, 500);
    },
    getScroll(h, item) {
      const scrollStyle = this.$util.formatStyle({ ...item.style, borderRadius: item.style.height })
      return (
        <ul class="scroll-wrapper" style={scrollStyle}>
          {item.textList.map((text, i) => (
            <li
              key={i}
              class={['flex', 'align-middle', 'scroll-item', { 'anim': this.animate && i === 0 }]}
              style={{ marginTop: this.animate && i === 0 ? `-${this.$util.changeRem(item.style.height)}` : '' }}
            >
              <span
                class={['userimg', 'flex-none', text.sex === 'man' ? 'man' : 'woman']}
                style={this.$util.formatStyle({ width: item.style.height })}
              ></span>
              <span class="scroll-text txtover">{text.text}</span>
            </li>
          ))}
        </ul>
      )
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollTimeId = setInterval(this.scroll, this.item.durationTime * 1000);
    })
  },
  beforeDestroy() {
    clearInterval(this.scrollTimeId);
    clearTimeout(this.animateTimeId);
  },
  render(h) {
    return (
      <div class="wg-marquee-single flex flex-center">
        {this.getScroll(h, this.item)}
      </div>
    )
  }
}