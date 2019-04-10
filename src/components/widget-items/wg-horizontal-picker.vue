<template>
  <div class="wg-item" :id="item.key" :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']" :style="item.style">
    <div class="wg-title" :style="{minWidth:item.label.labelwidth/50+'rem'}">{{item.label.labelTitle}}</div>
    <div class="flex-auto">
      <horizontal-picker
        v-model="item.value"
        style="margin: 0 auto;"
        :data="item.options"
        :pickerStyle="item.pickerStyle"
        :itemWidth="item.itemWidth"
        :showNumber="item.showNumber"
      ></horizontal-picker>
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