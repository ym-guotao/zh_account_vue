<template>
  <span>{{txt}}</span>
</template>

<script>
export default {
  name: 'formHeaderStep1',
  props: {
    template: String
  },
  computed: {
    txt () {
      switch (this.template) {
        // 邀请人的情况
        case 'inviter_id_auth':
          return '为确保信息真实，请验证你的手机号'
        // 海客卡的情况
        case 'haike_card':
          return '领取需验证手机号'
        // 默认情况
        default:
          return '验证手机号'
      }
    }
  }
}
</script>
