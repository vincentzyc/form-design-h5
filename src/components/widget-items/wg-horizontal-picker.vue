<template>
  <div class="wg-item" :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']" :style="item.style">
    <div class="wg-title" :style="{width:item.label.labelwidth/50+'rem'}">{{item.label.labelTitle}}</div>
    <div class="flex-auto" style="overflow:hidden">
      <horizontal-picker v-model="item.value" style="margin: 0 auto;" :data="item.options" :pickerStyle="item.pickerStyle" :showNumber="5"></horizontal-picker>
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
  },
  created() {

  }
}
// <template>
//   <base-page type="scroll-view" title="Scroll" class="option-demo">
//     <div slot="content" class="scroll-wrapper">
//       <div class="demo">
//         <div class="text-center">horizontal Scroll Picker</div>
//         <horizontal-picker
//           v-model="hpicker"
//           :pickerStyle="pickerStyle"
//           :data="items"
//           :defaultIndex="defaultIndex"
//           :itemWidth="itemWidth"
//           :showNumber="showNumber"
//         >
//           <!-- <template slot-scope="{item}">{{item === hpicker ? item + "岁":item}}</template> -->
//         </horizontal-picker>
//       </div>
//     </div>
//   </base-page>
// </template>
// export default {
//   data() {
//     return {
//       itemWidth: 80,
//       showNumber: 4,
//       defaultIndex: 3,
//       items: ['1000', '3000', '5000', '10000', '30000', '50000', '10万', '10万以上'],
//       hpicker: ""
//     }
//   },
//   methods: {

//   }
// }
// </script>
</script>