<template>
  <span class="timer">
    {{timerSeconds}}秒
  </span>
</template>

<script>
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
  watch: {
    timerSeconds (newVal, oldVal) {
      newVal < 1 && this.$emit('clearTimer')
    }
  },
  mounted () {
    if (this.timerSeconds > 0) {
      this.clock = setInterval(() => {
        this.timerSeconds = this.timerSeconds - 1
      }, 1000)
    }
  },
  destroyed () {
    clearInterval(this.clock)
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