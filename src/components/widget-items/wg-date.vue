<template>
  <div class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']" :style="{margin:item.margin}">
    <div class="wg-title">{{item.title}}</div>
    <div class="flex-auto">
      <input type="date" v-model="item.value" class="wg-input">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>
