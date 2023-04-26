<template>
  <div class="horizontal-container" ref="wgWrapper" :style="{ width: itemWidth * showNumber + 'px' }">
    <div class="scroll-wrapper">
      <div class="scroll-content" :style="{ width: (data.length + showNumber - 1) * itemWidth + 'px' }">
        <div class="scroll-item" :style="{ width: (itemWidth * (showNumber - 1)) / 2 + 'px' }"></div>
        <div
          class="scroll-item"
          v-for="(item, key) in data"
          :key="key"
          :style="activeItem(item)"
          @click="handClick(key)"
        >
          <template v-if="pickerSlot"><slot></slot></template>
          <span v-else>{{ item }}</span>
        </div>
        <div class="scroll-item" :style="{ width: (itemWidth * (showNumber - 1)) / 2 + 'px' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue';
import BScroll from '@better-scroll/core';

const ITEM_WIDTH = 48;
const SHOW_NUMBER = 5;

export default defineComponent({
  name: 'HorizontalPicker',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    pickerSlot: {
      type: Boolean,
      default: false,
    },
    pickerStyle: {
      type: Object,
      default: () => {
        return {
          color: '#d68317',
        };
      },
    },
    itemWidth: {
      type: Number,
      default: ITEM_WIDTH,
    },
    showNumber: {
      type: Number,
      default: SHOW_NUMBER,
    },
    data: {
      type: Array,
      required: true,
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    let bs = null;
    const wgWrapper = ref(),
      currentIndex = ref(0),
      draging = ref(false),
      scrollEndTimer = ref(0),
      scrollX = ref(0);

    const currentValue = computed(() => props.data[currentIndex.value]);

    const init = () => {
      bs = new BScroll(wgWrapper.value, {
        scrollX: true,
        scrollY: false,
        observeDOM: true,
        click: true,
        probeType: 3,
      });
      bs.on('touchEnd', pos => touchEnd(pos));
      bs.on('scrollEnd', pos => scrollEnd(pos));
      bs.on('beforeScrollStart', () => beforeScrollStart());
      bs.on('scrollCancel', () => scrollCancel());
      setDefaultIndex();
    };
    const setCurrentIndex = x => {
      const scrollNewX = Math.abs(x) + props.itemWidth / 2;
      currentIndex.value = Math.floor(scrollNewX / props.itemWidth);
      scrollX.value = -currentIndex.value * props.itemWidth;
      bs.scrollTo(scrollX.value, 0, 100);
      emit('update:modelValue', currentValue.value);
    };
    const touchEnd = pos => {
      draging.value = false;
      console.log('鼠标/手指离开', pos);
    };
    const scrollEnd = pos => {
      clearTimeout(scrollEndTimer.value);
      scrollEndTimer.value = setTimeout(() => {
        if (draging.value || scrollX.value === pos.x) return false;
        console.log('滑动结束', pos);
        draging.value = false;
        setCurrentIndex(pos.x);
      }, 50);
    };
    const beforeScrollStart = () => {
      draging.value = true;
      console.log('滑动开始之前');
    };
    const scrollCancel = () => {
      draging.value = false;
      console.log('滑动被取消');
    };

    const setDefaultIndex = () => {
      if (props.defaultIndex > 0) {
        currentIndex.value = props.defaultIndex;
        bs.scrollTo(-currentIndex.value * props.itemWidth, 0);
        emit('update:modelValue', currentValue.value);
      }
    };

    const handClick = key => {
      if (currentIndex.value === key) return;
      currentIndex.value = key;
      scrollX.value = -currentIndex.value * props.itemWidth;
      bs.scrollTo(scrollX.value, 0, 150);
      emit('update:modelValue', currentValue.value);
    };
    const activeItem = item => ({
      width: props.itemWidth + 'px',
      ...(item === currentValue.value ? props.pickerStyle : {}),
    });

    onMounted(async () => {
      await nextTick();
      init();
    });
    return {
      wgWrapper,
      activeItem,
      handClick,
    };
  },
});
</script>

<style lang="stylus">
.horizontal-container {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  height: 36px;
  line-height: 36px;
  overflow: hidden;
  margin: 0 auto;

  .scroll-wrapper {
    position: relative;
    display: inline-block;
    z-index: 1;

    .scroll-content {
      height: 36px;
      line-height: 36px;
      white-space: nowrap;
      margin: 0;
      padding: 0;
    }

    .scroll-item {
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
