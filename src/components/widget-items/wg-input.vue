<template>
  <div class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']" :style="{margin:item.margin}">
    <div class="wg-title" v-show="item.showLabel">{{item.title}}</div>
    <div class="flex-auto">
      <input v-model="item.value" :placeholder="item.placeholder" class="wg-input">
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
      if (this.item.value === '') return this.item.placeholder;
      return true;
    }
  }
}
</script>
