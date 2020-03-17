<template>
  <div :style="$util.formatStyle(item.style)">
    <ul class="flex flex-wrap" v-if="item.imglist">
      <li :class="[item.styleType==='col1'?'col-12':'col-6']" v-for="(item,index) in item.imglist" :key="index">
        <div class="flex flex-center" :class="{'cursor-pointer': $util.isLink(item.link)}" @click="jumpH5(item.link)">
          <img :src="item.img" alt="图片" width="100%" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    jumpH5(link) {
      let isLink = this.$util.isLink(link);
      if (!isLink) return;
      window.location.href = link
    }
  }
}
</script>