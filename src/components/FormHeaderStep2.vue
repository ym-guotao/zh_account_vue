<template>
  <span>{{txt}}</span>
</template>

<script>
export default {
  name: 'formHeaderStep2',
  props: {
    template: String
  },
  computed: {
    txt () {
      switch (this.template) {
        // 邀请人的情况
        case 'inviter_id_auth':
          return '完善信息，我们会通知对方你已为其证明'
        // 海客卡的情况
        case 'haike_card':
          return '请完善你的信息'
        // 默认情况
        default:
          return '欢迎注册正和岛'
      }
    }
  }
}
</script>