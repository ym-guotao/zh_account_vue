export default {
  data () {
    return {
      source: '',
      template: '',
      inviter: '',
      redir: ''
    }
  },
  created () {
    this.source = this.$route.query.source
    this.template = this.$route.query.template
    this.inviter = this.$route.query.inviter
    this.redir = this.$route.query.redir
  }
}
