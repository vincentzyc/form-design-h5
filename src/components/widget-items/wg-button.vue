<template>
  <div class="flex flex-center" :style="$util.formatStyle(item.style)">
    <img v-if="item.style.isImgBtn" :src="item.style.value" alt="图片按钮" width="100%" @click="clickBtn(item)" />
    <button
      v-else
      class="wg-button"
      :style="$util.formatStyle(item.style.btnStyle)"
      @click="clickBtn(item)"
    >{{item.btnText}}</button>
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
  methods: {
    clickBtn(item) {
      this.BUS.$emit('handleClick', { type: item.btnType });
    }
  }
}
</script>