<template>
  <div class="wg-splitLine">
    <hr class="splitLine-hr" :style="item.style" />
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    required: true
  }
}
</script>
