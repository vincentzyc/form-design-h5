<template>
  <div class="wg-item" :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']" :style="item.style">
    <div class="wg-title" :style="{width:item.label.labelwidth/50+'rem'}">{{item.label.labelTitle}}</div>
    <div class="flex-auto">
      <input type="date" v-model="item.value" class="wg-input">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    validate() {
      if (this.item.value === '') return `请选择${this.item.labelTitle}`;
      return true;
    }
  }
}
</script>
