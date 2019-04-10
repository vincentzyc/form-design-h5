
<template>
  <cube-scroll
    ref="scroll"
    direction="horizontal"
    class="horizontal-scroll-list-wrap"
    :style="{ width: itemWidth*showNumber + 'px'}"
    :options="BScollOptions"
    v-if="data.length>0"
  >
    <div ref="wrapper" class="picker-slot-wrapper" :style="{width: (data.length+showNumber-1) * itemWidth + 'px'}">
      <div class="picker-item" :style="{width: itemWidth * (showNumber - 1) / 2 + 'px'}"></div>
      <div
        class="picker-item"
        v-for="(item,key) in data"
        :key="item"
        :style="[{width:itemWidth + 'px'},item === currentValue ? pickerStyle : {}]"
        @click="handClick(key)"
      >
        <span v-if="!pickerSlot">{{item}}</span>
        <slot v-else :item="item"></slot>
      </div>
      <div class="picker-item" :style="{width: itemWidth * (showNumber - 1) / 2 + 'px'}"></div>
    </div>
  </cube-scroll>
</template>

<script type="text/ecmascript-6">

const ITEM_WIDTH = 48;
const SHOW_NUMBER = 5;

export default {
  name: "horizontal-picker",
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    pickerSlot: {
      type: Boolean,
      default: false
    },
    pickerStyle: {
      type: Object,
      default: () => {
        color: '#d68317';
      }
    },
    itemWidth: {
      type: Number,
      default: ITEM_WIDTH
    },
    showNumber: {
      type: Number,
      default: SHOW_NUMBER
    },
    data: {
      type: Array,
      default: [],
      required: true
    },
    defaultIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentIndex: 0,
      BScoll: null,
      BScollOptions: {
        bounceTime: 300,
        swipeTime: 500
      },
      draging: false,
      scrollEndTimer: null,
      scrollX: null
    }
  },
  computed: {
    currentValue() {
      return this.data[this.currentIndex]
    }
  },
  methods: {
    handClick(key) {
      if (this.currentIndex === key) return;
      this.currentIndex = key;
      this.scrollX = -this.currentIndex * this.itemWidth;
      this.BScoll.scrollTo(this.scrollX, 0, 150);
      this.$emit('input', this.currentValue);
    },
    setCurrentIndex(x) {
      let scrollNewX = Math.abs(x) + this.itemWidth / 2;
      this.currentIndex = Math.floor(scrollNewX / this.itemWidth);

      console.log(this.currentIndex * this.itemWidth);

      this.scrollX = -this.currentIndex * this.itemWidth;

      this.BScoll.scrollTo(this.scrollX, 0, 200);

      this.$emit('input', this.currentValue);
    },
    touchEnd(pos) {
      this.draging = false;
      console.log('鼠标/手指离开', pos);
    },
    scrollEnd(pos) {
      clearTimeout(this.scrollEndTimer);
      this.scrollEndTimer = setTimeout(() => {
        if (this.draging || this.scrollX === pos.x) return false;
        console.log('滑动结束', pos);
        this.draging = false;
        this.setCurrentIndex(pos.x);
      }, 50);
    },
    beforeScrollStart() {
      this.draging = true;
      console.log('滑动开始之前');
    },
    scrollCancel() {
      this.draging = false;
      console.log('滑动被取消');
    },
    setDefaultIndex() {
      if (this.defaultIndex > 0) {
        this.currentIndex = this.defaultIndex;
        this.BScoll.scrollTo(-this.currentIndex * this.itemWidth, 0);
        this.$emit('input', this.currentValue);
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.BScoll = this.$refs.scroll.scroll;

      this.BScoll.on('touchEnd', pos => this.touchEnd(pos))

      this.BScoll.on('scrollEnd', pos => this.scrollEnd(pos))

      this.BScoll.on('beforeScrollStart', () => this.beforeScrollStart())

      this.BScoll.on('scrollCancel', () => this.scrollCancel())

      this.setDefaultIndex()
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.horizontal-scroll-list-wrap {
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 36px;
  border-radius: 20px;

  .cube-scroll-content {
    display: inline-block;
  }

  .picker-slot-wrapper {
    white-space: nowrap;
    height: 36px;
    line-height: 36px;
    margin: 0;
    padding: 0;

    .picker-item {
      height: 100%;
      text-align: center;
      display: inline-block;
      padding: 0;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #707274;
      box-sizing: border-box;
      backface-visibility: hidden;
    }
  }
}
</style>