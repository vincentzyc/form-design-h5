<template>
  <div
    class="wg-staticText clearfix"
    @click="jumpH5(item.link)"
    :style="{backgroundImage:`url(${item.backgroundImage||''})`}"
  >
    <p :style="$util.formatStyle(item.style)" v-html="$util.textBr(item.value)"></p>
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