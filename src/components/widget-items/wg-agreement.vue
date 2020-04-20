<template>
  <div class="wg-agreement clearfix">
    <van-checkbox v-model="item.value" :style="$util.formatStyle(item.style)">
      <p :style="{color:item.style.color}">
        <span>{{item.tipText}}</span>
        <span v-for="(titleText,key) in item.titleTexts" :key="key">
          <span v-if="key>0">和</span>
          <span
            v-if="titleText.title"
            :style="{color:item.agreementColor}"
            @click.stop="openAgreement(titleText.title,titleText.text)"
          >{{titleText.title}}</span>
        </span>
      </p>
    </van-checkbox>
    <agreement-popup ref="agreement" />
  </div>
</template>

<script>
import { Checkbox } from 'vant';
import AgreementPopup from '@/components/agreement-popup.vue'
export default {
  components: {
    "agreement-popup": AgreementPopup,
    "van-checkbox": Checkbox
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    openAgreement(title, text) {
      this.$refs.agreement.open(text);
    }
  }
}
</script>