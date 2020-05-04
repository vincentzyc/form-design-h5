<template>
  <div class="wg-item" :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']" :style="item.style">
    <div
      class="wg-title"
      v-show="item.showLabel"
      :style="{width:$util.changeRem(item.label.labelwidth)}"
    >{{item.label.labelTitle}}</div>
    <div class="flex-auto">
      <input v-model="item.value" :placeholder="item.placeholder" class="wg-input" :id="item.key"/>
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
