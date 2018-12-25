<template>
  <div class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']" :style="item.style">
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
  },
  methods: {
    validate() {
      if (this.item.value === '') return `请选择${this.item.title}`;
      return true;
    }
  }
}
</script>
