<template>
  <div class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']" :style="{margin:item.margin}">
    <div class="wg-title" v-show="item.showLabel">{{item.title}}</div>
    <div class="flex-auto">
      <select v-model="item.value" class="wg-select">
        <option value disabled selected hidden>{{item.placeholder}}</option>
        <option v-for="item in item.options" :key="item" :value="item" :label="item.showLabel?item.label:item"></option>
      </select>
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
