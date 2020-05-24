<template>
  <div class="wg-marquee-single flex flex-center">
    <ul class="scroll-wrapper" :style="$util.formatStyle({...item.style,borderRadius:item.style.height})">
      <li
        v-for="(text, i) in item.textList"
        :key="i"
        class="flex align-middle scroll-item"
        :class="{'anim' : animate&&i===0 }"
        :style="{marginTop:animate&&i===0?`-${$util.changeRem(item.style.height)}`:''}"
      >
        <span
          class="userimg flex-none"
          :class="text.sex==='man'?'man':'woman'"
          :style="$util.formatStyle({width:item.style.height})"
        ></span>
        <span class="scroll-text txtover">{{ text.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
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
  }
}
</script>