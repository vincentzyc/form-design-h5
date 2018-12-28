<template>
  <div class="wg-item wg-switch" :class="[item.labelPosition==='top'?'flex-column':'align-middle']" :style="item.style">
    <div class="wg-title" :style="{width:item.labelwidth/50+'rem'}">{{item.labelTitle}}</div>
    <label class="label">
      <input type="checkbox" class="wg-switch-input" v-model="item.value" style="display:none">
      <span class="wg-switch-core"></span>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>
