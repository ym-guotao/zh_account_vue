<template>
  <div
    class="message-box bg-dark"
    :class="{active : message}"
    @click="onWrapperClick"
  >
    <p class="message-box__paragraph">
      <span class="message-box__text">
        {{message}}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'popup',
  props: {
    message: String
  },
  methods: {
    onWrapperClick () {
      this.$emit('clearMessage')
    }
  }
}
</script>

<style lang="less">
@import "../style/fn";
.message-box{
  position: fixed;
  top: 0;
  bottom: 0;
  left:0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s;
  display: none;
  z-index: 9;
  text-align: center;
  .message-box__paragraph{
    display: table-cell;
    vertical-align: middle;
    .message-box__text{
      background: rgba(0, 0, 0, 0.7);
      display: inline-block;
      margin: auto;
      padding: .15rem 0.2rem;
      border-radius: 6px;
      text-align: center;
      color: #fff;
      font-size:.15rem;
      display: inline-block;
    }
  }
}
.message-box.active{
  opacity:1;
  display: table;
  
}
.bg-dark{
  background-color: @black-30;
}
</style>