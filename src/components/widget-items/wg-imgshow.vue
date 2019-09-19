<template>
  <div :style="$util.formatStyle(item.style)">
    <div class="flex flex-center" @click="jumpH5(item.link)">
      <img :src="item.value" alt="图片展示" width="100%" />
    </div>
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
    jumpH5(link) {
      let isLink = this.$util.isLink(link);
      if (!isLink) return;
      window.location.href = link
    }
  }
}
</script>