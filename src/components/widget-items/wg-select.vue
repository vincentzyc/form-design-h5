<template>
  <div class="wg-item" :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']" :style="item.style">
    <div
      class="wg-title"
      v-show="item.showLabel"
      :style="{width:$util.changeRem(item.label.labelwidth)}"
    >{{item.label.labelTitle}}</div>
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
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
