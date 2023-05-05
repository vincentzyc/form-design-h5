<template>
  <div :style="$util.formatStyle(getStyle)" class="wg-countdown" v-if="!isFinished">
    <p class="flex flex-center">
      <span class="countdown-title">{{ item.title }}</span>
      <CountDown :time="endTime" @finish="finished" class="flex-inline align-middle">
        <template #default="timeData">
          <span :style="$util.formatStyle(item.timeStyle)" class="countdown-timeblock" v-if="timeData.days > 0">{{
            timeData.days
          }}</span>
          <span :style="$util.formatStyle(item.unitStyle)" class="countdown-colon" v-if="timeData.days > 0">天</span>
          <span
            :style="$util.formatStyle(item.timeStyle)"
            class="countdown-timeblock"
            v-if="timeData.days > 0 || timeData.hours > 0"
            >{{ timeData.hours > 9 ? timeData.hours : '0' + timeData.hours }}</span
          >
          <span
            :style="$util.formatStyle(item.unitStyle)"
            class="countdown-colon"
            v-if="timeData.days > 0 || timeData.hours > 0"
            >时</span
          >
          <span
            :style="$util.formatStyle(item.timeStyle)"
            class="countdown-timeblock"
            v-if="timeData.days > 0 || timeData.hours > 0 || timeData.minutes > 0"
            >{{ timeData.minutes > 9 ? timeData.minutes : '0' + timeData.minutes }}</span
          >
          <span
            :style="$util.formatStyle(item.unitStyle)"
            class="countdown-colon"
            v-if="timeData.days > 0 || timeData.hours > 0 || timeData.minutes > 0"
            >分</span
          >
          <span :style="$util.formatStyle(item.timeStyle)" class="countdown-timeblock">{{
            timeData.seconds > 9 ? timeData.seconds : '0' + timeData.seconds
          }}</span>
          <span :style="$util.formatStyle(item.unitStyle)" class="countdown-colon">秒</span>
        </template>
      </CountDown>
    </p>
  </div>
</template>

<script setup>
import { CountDown } from 'vant';
import { computed, nextTick, ref, onMounted } from 'vue';
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const isFinished = ref(false);
const getStyle = computed(() => {
  if (props.item.style.backgroundImage) {
    return {
      ...props.item.style,
      backgroundImage: `url(${props.item.style.backgroundImage})`,
      backgroundColor: 'transparent',
    };
  } else {
    return props.item.style;
  }
});
const endTime = computed(() => {
  return props.item.endTime - Date.now();
});
function finished() {
  initCountDown();
}
function getDayLoopEndTime() {
  const today = new Date().toLocaleDateString();
  const todayTimeStamp = new Date(today).getTime();
  return todayTimeStamp + 24 * 60 * 60 * 1000;
}
function initCountDown() {
  if (props.item.countDownType === 'dayLoop') {
    props.item.endTime = getDayLoopEndTime();
  } else {
    isFinished.value = props.item.endTime < Date.now();
  }
}

onMounted(() => {
  nextTick(() => initCountDown());
});
</script>
