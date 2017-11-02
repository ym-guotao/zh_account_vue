export default {
  data () {
    return {
      template: '',
      inviter: ''
    }
  },
  created () {
    this.template = this.$route.query.template
    this.inviter = this.$route.query.inviter
  }
}
