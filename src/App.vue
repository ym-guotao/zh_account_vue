<template>
  <div id="app">
    <router-view class="views" />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import "./style/fn";
@import "./style/reset";
@import "./style/animate";

.views{
  a, a:visited{
    color: @dark-fawn;
  }
}
</style>

