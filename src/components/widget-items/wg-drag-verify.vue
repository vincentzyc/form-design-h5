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

<script>
import DragVerify from "@/components/base/DragVerify.vue";
export default {
  components: {
    DragVerify,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
