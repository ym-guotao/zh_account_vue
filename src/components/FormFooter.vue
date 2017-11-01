<template>
  <p v-if="step === 'step1'" class="info" key="step1">
    完成验证后你可以使用此手机号登录正和岛并享受正和岛官方提供的所有服务
  </p>
  <p class="info" v-else key="not-step1">
    点击上方立即注册按钮，即表示你同意
    <a href="http://mp.zhisland.com/wmp/tool/zhisland/protocol">正和岛用户服务及隐私协议</a>
    。如有疑问请致电: 
    <a href="tel:4001009737">400-100-9737</a>
  </p>
</template>

<script>
export default {
  name: 'formFooter',
  props: {
    step: String
  }
}
</script>

<style lang="less">
@import "../style/fn";

.info {
  font-size:.13rem;
  margin-top:.12rem;
  color: #B2B2B2;
  line-height: 1.6;
}
</style>