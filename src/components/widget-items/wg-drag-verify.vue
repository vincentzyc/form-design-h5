<template>
  <div>
    <DragVerify
      ref="dragVerify"
      :isPassing.sync="item.value"
      :text="item.placeholder"
      :successText="item.successText"
    />
  </div>
</template>

<script setup>
import DragVerify from '@/components/base/DragVerify.vue';

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
