<template>
  <div class="wg-phone" :style="item.style">
    <div class="wg-item" :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']">
      <div class="wg-title flex-none" v-show="item.showLabel" :style="{width:item.label.labelwidth/50+'rem'}">{{item.label.labelTitle}}</div>
      <div class="flex-auto">
        <input class="wg-input" type="tel" maxlength="11" v-model="item.value" :placeholder="item.placeholder">
      </div>
    </div>
    <div class="wg-item" v-if="item.showCode" :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']">
      <div class="wg-title flex-none" v-show="item.showLabel" :style="{width:item.label.labelwidth/50+'rem'}">验证码</div>
      <div class="flex flex-auto">
        <input placeholder="验证码" type="tel" maxlength="6" v-model="item.codeValue" class="wg-input flex-auto">
        <ValidateCodeBtn :phone="item.value" :style="item.style.btnStyle"/>
      </div>
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
      if (this.item.value === '') return "请输入手机号";
      if (!this.$util.checkMobile(this.item.value)) return "请输入正确的手机号";
      if (this.item.showCode && this.item.codeValue.length !== 6) return "验证码错误";
      return true;
    }
  }
}
</script>

