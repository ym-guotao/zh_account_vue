<template>
  <span class="timer">
    {{timerSeconds}}秒
  </span>
</template>

<script>
// 请所有组件文件大写开头
export default {
  name: 'timer',
  props: {
    seconds: Number
  },
  data () {
    return {
      timerSeconds: this.seconds
    }
  },
  // methods: {
  //   testScroll () {
  //     console.log('scrolling...')
  //   }
  // },
  watch: {
    timerSeconds (newVal, oldVal) {
      newVal < 1 && this.$emit('clearTimer')
    }
  },
  mounted () {
    // window.addEventListener('scroll', this.testScroll)
    if (this.timerSeconds > 0) {
      this.codeClock = setInterval(() => {
        this.timerSeconds = this.timerSeconds - 1
      }, 1000)
    }
  },
  destroyed () {
    // window.removeEventListener('scroll', this.testScroll)
    clearInterval(this.codeClock)
  }
}
</script>

<style lang="less">
.timer{
  border: 1px solid #dfdfdf;
  padding: .04rem;
  font-size: .14rem;
  border-radius:4px;
  color: #b2b2b2;
  display: inline-block;
  text-align: center!important;
  width: .7rem;
}
</style>