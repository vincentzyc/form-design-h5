<template>
  <div class="wg-phone" :style="$util.formatStyle(item.style)">
    <div class="wg-item" :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']">
      <div
        class="wg-title flex-none"
        v-show="item.showLabel"
        :style="{width:$util.changeRem(item.label.labelwidth)}"
      >{{item.label.labelTitle}}</div>
      <div class="flex-auto">
        <input
          class="wg-input"
          type="tel"
          maxlength="11"
          v-model.trim="item.value"
          :placeholder="item.placeholder"
        />
      </div>
    </div>
    <div class="wg-item" v-if="item.showCode" :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']">
      <div
        class="wg-title flex-none"
        v-show="item.showLabel"
        :style="{width:$util.changeRem(item.label.labelwidth)}"
      >验证码</div>
      <div class="flex flex-auto flex-center">
        <input placeholder="验证码" type="tel" maxlength="6" v-model.trim="item.codeValue" class="wg-input flex-auto" />
        <ValidateCodeBtn :phone="item.value" :style="$util.formatStyle(item.style.btnStyle)" />
      </div>
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

