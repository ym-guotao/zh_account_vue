import {send} from '@/lib/http'
import store from '@/store'

export default {
  data () {
    return {
      source: '',
      template: '',
      redir: '',
      inviter: {}
    }
  },
  created () {
    this.source = this.$route.query.source
    this.template = this.$route.query.template
    this.redir = this.$route.query.redir
    this.inviterId = this.$route.query.inviter
  },
  mounted () {
    if (this.inviter) {
      send(`${store.baseUrl}/wz/account/userinfo?inviter=${this.inviterId}`)
        .then(response => {
          this.inviter = response
        })
    }
  }
}
