<template>
  <div :style="$util.formatStyle(getStyle)" class="wg-countdown" v-if="!isFinished">
    <p class="flex flex-center">
      <span class="countdown-title">{{item.title}}</span>
      <CountDown :time="endTime" @finish="finished" class="flex-inline align-middle">
        <template #default="timeData">
          <span
            :style="$util.formatStyle(item.timeStyle)"
            class="countdown-timeblock"
            v-if="timeData.days>0"
          >{{ timeData.days }}</span>
          <span :style="$util.formatStyle(item.unitStyle)" class="countdown-colon" v-if="timeData.days>0">天</span>
          <span
            :style="$util.formatStyle(item.timeStyle)"
            class="countdown-timeblock"
            v-if="timeData.days>0||timeData.hours>0"
          >{{ timeData.hours>9?timeData.hours:'0'+timeData.hours }}</span>
          <span
            :style="$util.formatStyle(item.unitStyle)"
            class="countdown-colon"
            v-if="timeData.days>0||timeData.hours>0"
          >时</span>
          <span
            :style="$util.formatStyle(item.timeStyle)"
            class="countdown-timeblock"
            v-if="timeData.days>0||timeData.hours>0||timeData.minutes>0"
          >{{ timeData.minutes>9?timeData.minutes:'0'+timeData.minutes }}</span>
          <span
            :style="$util.formatStyle(item.unitStyle)"
            class="countdown-colon"
            v-if="timeData.days>0||timeData.hours>0||timeData.minutes>0"
          >分</span>
          <span
            :style="$util.formatStyle(item.timeStyle)"
            class="countdown-timeblock"
          >{{ timeData.seconds>9?timeData.seconds:'0'+timeData.seconds }}</span>
          <span :style="$util.formatStyle(item.unitStyle)" class="countdown-colon">秒</span>
        </template>
      </CountDown>
    </p>
  </div>
</template>

<script>
import { CountDown } from 'vant';
export default {
  components: {
    CountDown
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFinished: false
    }
  },
  computed: {
    getStyle() {
      if (this.item.style.backgroundImage) {
        return {
          ...this.item.style,
          backgroundImage: `url(${this.item.style.backgroundImage})`,
          backgroundColor: 'transparent'
        }
      } else {
        return this.item.style
      }
    },
    endTime() {
      return this.item.endTime - Date.now()
    }
  },
  methods: {
    finished() {
      this.initCountDown()
    },
    getDayLoopEndTime() {
      const today = new Date().toLocaleDateString()
      const todayTimeStamp = new Date(today).getTime()
      return todayTimeStamp + 24 * 60 * 60 * 1000
    },
    initCountDown() {
      if (this.item.countDownType === 'dayLoop') {
        this.item.endTime = this.getDayLoopEndTime()
      } else {
        this.isFinished = this.item.endTime < Date.now()
      }
    }
  },
  mounted() {
    this.$nextTick(() => this.initCountDown())
  }
}
</script>