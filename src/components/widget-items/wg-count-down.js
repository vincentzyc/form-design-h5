import Utils from '@/utils/index'
import { CountDown } from 'vant';

export default {
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
    },
    getDays(item, timeData) {
      return (
        timeData.days > 0 || timeData.hours > 0 ?
          <span>
            <span
              style={Utils.formatStyle(item.timeStyle)}
              class="countdown-timeblock"
            >{timeData.days}</span>
            <span style={Utils.formatStyle(item.unitStyle)} class="countdown-colon">天</span>
          </span> : null
      )
    },
    getHours(item, timeData) {
      return (
        timeData.days > 0 || timeData.hours > 0 ?
          <span>
            <span
              style={Utils.formatStyle(item.timeStyle)}
              class="countdown-timeblock"
            >{timeData.hours > 9 ? timeData.hours : '0' + timeData.hours}</span>
            <span style={Utils.formatStyle(item.unitStyle)} class="countdown-colon">时</span>
          </span> : null
      )
    },
    getMinutes(item, timeData) {
      return (
        timeData.days > 0 || timeData.hours > 0 || timeData.minutes > 0 ?
          <span>
            <span
              style={Utils.formatStyle(item.timeStyle)}
              class="countdown-timeblock"
            >{timeData.minutes > 9 ? timeData.minutes : '0' + timeData.minutes}</span>
            <span style={Utils.formatStyle(item.unitStyle)} class="countdown-colon">分</span>
          </span> : null
      )
    },
    getSeconds(item, timeData) {
      return (
        <span>
          <span
            style={Utils.formatStyle(item.timeStyle)}
            class="countdown-timeblock"
          >{timeData.seconds > 9 ? timeData.seconds : '0' + timeData.seconds}</span>
          <span style={Utils.formatStyle(item.unitStyle)} class="countdown-colon">秒</span>
        </span>
      )
    },
    getCountDown(h, item) {
      return (
        <p class="flex flex-center">
          <span class="countdown-title">{item.title}</span>
          <CountDown time={this.endTime} onFinish={this.finished} class="flex-inline align-middle">
            {timeData => (
              <span>
                {this.getDays(item, timeData)}
                {this.getHours(item, timeData)}
                {this.getMinutes(item, timeData)}
                {this.getSeconds(item, timeData)}
              </span>
            )}
          </CountDown>
        </p>
      )
    }
  },
  mounted() {
    this.$nextTick(() => this.initCountDown())
  },
  render(h) {
    const { item } = this;
    if (this.isFinished) return null
    return (
      <div style={Utils.formatStyle(this.getStyle)} class="wg-countdown">
        {this.getCountDown(h, item)}
      </div>
    )
  }
}