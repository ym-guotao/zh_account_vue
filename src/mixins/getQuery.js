import {send} from '@/lib/http'
import store from '@/store'
import { setNavTitle } from '@/util'

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
    switch (this.template) {
      case 'inviter_id_auth':
        setNavTitle('正和岛证明人邀请')
        break
      case 'resource':
      case 'reward':
      case 'favor':
        setNavTitle('验证联系方式')
        break
      default:
        setNavTitle('注册正和岛')
    }
  },

  mounted () {
    if (this.inviterId) {
      send(`${store.baseUrl}/wz/account/userinfo?inviter=${this.inviterId}`)
        .then(response => {
          this.inviter = response
        })
    }
  }
}
