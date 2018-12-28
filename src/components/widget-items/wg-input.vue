<template>
  <div class="wg-item" :class="[item.labelPosition==='top'?'flex-column':'align-middle']" :style="item.style">
    <div class="wg-title" v-show="item.showLabel" :style="{width:item.labelwidth/50+'rem'}">{{item.labelTitle}}</div>
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
