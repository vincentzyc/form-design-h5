<template>
  <transition name="fade">
    <div class="jb-loading" v-show="visible">
      <div class="jb-loading-wrapper" :style="{ 'padding': text ? '20px' : '15px' }">
        <span class="jb-loading-spin" v-if="type==='snake'">
          <div class="jb-snake"></div>
        </span>
        <div class="jb-triple-bounce" v-else-if="type==='triple-bounce'">
          <div class="jb-triple-bounce-bounce1"></div>
          <div class="jb-triple-bounce-bounce2"></div>
          <div class="jb-triple-bounce-bounce3"></div>
        </div>
        <v-sandglass v-else/>
        <span class="jb-loading-text" v-show="text">{{ text }}</span>
      </div>
      <div class="jb-loading-mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<script>
/**
 * 参照mint-ui修改
 * 使用方法
 *  this.$loading.open({
        text: '加载中...', // 文本内容  String  默认空
        type: 'triple-bounce'  //加载图标的类型 (snake/triple-bounce/sandglass) String  默认 "snake"
    });
 *  this.$loading.close();
 */
import sandglass from "./sandglass";
export default {
  components: {
    "v-sandglass": sandglass
  },
  data () {
    return {
      visible: false
    };
  },
  props: {
    text: String,
    type: {
      type: String,
      default: "snake"
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.jb-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 99;
}
.jb-loading-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
}
.jb-loading-text {
  display: block;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}
.jb-loading-spin {
  display: inline-block;
  text-align: center;
}
.jb-loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #25262d;
  opacity: 0.5;
  z-index: 999;
}
/*
    jb-snake  动画
*/
.jb-snake {
  height: 32px;
  width: 32px;
  -webkit-animation: jb-rotate 0.8s infinite linear;
  animation: jb-rotate 0.8s infinite linear;
  border: 4px solid transparent;
  border-top-color: rgb(204, 204, 204);
  border-left-color: rgb(204, 204, 204);
  border-bottom-color: rgb(204, 204, 204);
  border-radius: 50%;
}
@-webkit-keyframes jb-rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@keyframes jb-rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
/*
    jb-triple-bounce  动画
*/
.jb-triple-bounce > div {
  width: 10px;
  height: 10px;
  margin-left: 5px;
  background-color: rgb(204, 204, 204);
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: jb-triple-bounce 1.4s infinite ease-in-out both;
  animation: jb-triple-bounce 1.4s infinite ease-in-out both;
}
.jb-triple-bounce > div:first-child {
  margin-left: 0;
}
.jb-triple-bounce-bounce1 {
  -webkit-animation-delay: -0.32s !important;
  animation-delay: -0.32s !important;
}
.jb-triple-bounce-bounce2 {
  -webkit-animation-delay: -0.16s !important;
  animation-delay: -0.16s !important;
}
@-webkit-keyframes jb-triple-bounce {
  0%,
  80%,
  to {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes jb-triple-bounce {
  0%,
  80%,
  to {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
