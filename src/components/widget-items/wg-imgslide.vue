<template>
  <div class="wg-imgslide">
    <div :style="{margin:item.style.margin}">
      <div :style="{width:'100%',height:item.style.height/88.88+'rem'}">
        <cube-slide :ref="item.key" :data="item.value" :interval="item.interval" style="max-width:640px">
          <cube-slide-item v-for="(images, index) in item.value" :key="index">
            <a :href="images.url">
              <img :src="images.image" width="100%" />
            </a>
          </cube-slide-item>
        </cube-slide>
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