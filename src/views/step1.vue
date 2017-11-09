<template>
  <div class="step1">
    <TopBanner
      :template="template"
      :inviter="inviter"
    />
    <div class="container">
      <h4 class="form-header"> 
        <span class="line">&nbsp;</span>
        <FormHeaderStep1
          :template="template"
        />
      </h4>
      <form class="register-form">
        <div class="selecter-wrapper form-item">
          <select 
            class="block country-list select" 
            v-model="dcc"
          >
            <option 
              v-for="country in countryArr" 
              :key="country.key" 
              :value="country.value"
            >
              {{country.value2}}&nbsp;&nbsp;&nbsp;+{{country.value && country.value.slice(2)}}
            </option>
          </select>
        </div>
        <div class="form-item">
          <input 
            type="number" 
            pattern="[0-9]*"  
            class="block input" 
            placeholder="请输入手机号"
            v-model.trim="mobile"
          />
        </div>
        <div class="input-wrapper form-item">
          <input 
            type="number" 
            style="width: 65%; display:inline-block"  
            pattern="[0-9]*" 
            class="block input" 
            placeholder="请输入4位验证码"
            v-model.trim="code"
          />
          <span>
            <em 
              :class="sendClass"
              v-if="!this.showTimer"
              @click="() => beforeSubmit(onSendCode)"
            >
              发送验证码
            </em>
            <!-- @clearTimer="() => {this.showTimer = false}" -->
            <Timer 
              :seconds="30"
              @clearTimer="clearTimer"
              v-if="this.showTimer"
            />
          </span>
        </div>
        <button 
          class="block step1-submit button"
          :disabled="btnNotAvailable"
          @click="(event) => onSubmit(event)"
        >
          下一步
        </button>
        <FormFooter step="step1" />
      </form>
    </div>
    <Popup 
      @clearMessage="clearMessage"
      :message="message"
    />
  </div>
</template>

<script>
// import fetch from 'node-fetch'
import TopBanner from '@/components/TopBanner'
import FormHeaderStep1 from '@/components/FormHeaderStep1'
import FormFooter from '@/components/FormFooter'
import Popup from '@/components/Popup'
import Timer from '@/components/Timer'
// import {send} from '@/lib/http'
import http from '@/lib/http'
import store from '@/store'
import getQuery from '@/mixins/getQuery'
import encodeParams from '@/mixins/encodeParams'
import wechat from '@/mixins/wechat'

export default {
  name: 'step1',

  mixins: [getQuery, encodeParams, wechat],

  data () {
    return {
      dcc: '0086',
      mobile: '',
      code: '',
      disableSendCode: false,
      showTimer: false,
      vCode: '',
      message: '',
      countryArr: [{key: 'country_207', value: '0086', value2: '中国'}]
    }
  },

  watch: {
    code (n, o) {
      if (n.length > 4) {
        this.code = n.slice(0, 4)
      }
      sessionStorage.setItem('code', this.code)
    },

    mobile (n, o) {
      if (this.dcc === '0086' && n.length > 11) {
        this.mobile = n.slice(0, 11)
      }
      if (n.length > 20) {
        this.mobile = n.slice(0, 20)
      }
      sessionStorage.setItem('mobile', this.mobile)
    },

    dcc (n) {
      if (n === '0086' && this.mobile.length > 11) {
        this.mobile = this.mobile.slice(0, 11)
      }
      sessionStorage.setItem('dcc', this.dcc)
    }
  },

  computed: {
    sendClass () {
      return this.disableSendCode ? 'send-v-code' : 'send-v-code green'
    },

    btnNotAvailable () {
      if (this.dcc === '0086') {
        return this.code.length !== 4 || this.mobile.length !== 11
      }
      return this.code.length !== 4
    }
  },

  methods: {
    _getFromStorage (key) {
      if (sessionStorage.getItem(key)) {
        this[key] = sessionStorage.getItem(key)
      }
    },

    clearMessage () {
      this.message = ''
    },

    clearTimer () {
      this.showTimer = false
    },

    // 合法性检测之后调用 next
    beforeSubmit (next, e) {
      if (this.dcc === '0086' && !(/^1\d{10}$/).test(this.mobile)) {
        this.message = '请输入正确的手机号'
        return
      }
      if (this.dcc !== '0086' && !(/^\d+/).test(this.mobile)) {
        this.message = '请输入正确的手机号'
        return
      }
      next()
    },

    onSendCode () {
      http.lock()({
        url: `${store.baseUrl}/wz/account/mobile/check`,
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.encodeParams({
          dcc: this.dcc,
          mobile: this.mobile
        })
      })
        .then(response => {
          this.showTimer = true
        })
    },

    onSubmit (event) {
      event.preventDefault()
      sessionStorage.setItem('dcc', this.dcc)
      http.lock()({
        url: `${store.baseUrl}/wz/account/submit`,
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.encodeParams({
          dcc: this.dcc,
          mobile: this.mobile,
          code: this.code
        })
      })
        .then(response => {
          const {code, msg, data} = response.data
          if (code < 0) {
            this.message = msg
            return
          }
          if (code === 1) {
            if (this.redir) {
              let tmp = decodeURIComponent(this.redir)
              tmp = /\?/.test(tmp) ? tmp + '&' : tmp + '?'
              window.location.href = tmp + data
            }
            // 否则根据环境进行跳转
            switch (window.location.hostname) {
              case 'pre.m.zhsland.com':
                window.location.href = 'http://pre.m.zhsland.com/wz/app/download'
                break
              case 'm.zhisland.com':
                window.location.href = 'http://m.zhisland.com/wz/app/download'
                break
              default:
                window.location.href = 'http://test.m.zhisland.com/wz/app/download'
            }
            return
          }
          // 成功 (code === 0)后跳转路由
          const query = this.$route.query
          this.$router.push({
            path: '/step2',
            query
          })
        })
    }
  },

  components: {
    TopBanner,
    FormHeaderStep1,
    FormFooter,
    Popup,
    Timer
  },

  mounted () {
    // 获取国家码
    http.lock().get(`${store.baseUrl}/wz/tool/dict/country_code`)
      .then(response => {
        this.countryArr = Object.values(response.data)
      })
    // 设置sessionStorage
    this._getFromStorage('dcc')
    this._getFromStorage('mobile')
    this._getFromStorage('code')
  }
}
</script>

<style lang="less" scoped>
@import "../style/fn.less";

.container{
  padding: .1rem 0.24rem;
  .form-header{
    font-size: .17rem;
    font-weight: normal;
    margin: .22rem auto;
    .line{
      display: inline-block;
      width:.04rem;
      height: .18rem;
      position:relative;
      top: .01rem;
      background: @dark-fawn;
      border-radius: 1px;
      margin-right:8px;
    }
  }
  .register-form {
    font-size: .15rem;
    .button{
      height: 44px;
      background: @dark-fawn;
      border: 0;
      border-radius:4px;
      color:#fff;
      font-size:.17rem;
    }
    .step1-submit[disabled]{
      opacity: .3;
    }
    .block{
      width: 100%;
    }
    .form-item{
      margin-bottom: .3rem;
    }
    .input, .select{
      border-width: 0 0 1px 0;
      height: .32rem;
      font-size: 15px;
      border-bottom-color: #EDEDED;
      background-color: transparent;
      border-radius: 0;
      padding:0;
    }
    .selecter-wrapper,
    .input-wrapper{
      position: relative;
    }
    .input-wrapper{
      span {
        display: inline-block;
        width: 1rem;
        position: absolute;
        right:0;
        top: 0;
        text-align: right;
        box-sizing: border-box;
        .send-v-code{
          border: 1px solid rgba(0, 0, 0, 0.6);
          padding: 6px;
          font-style: normal;
          color: rgba(0, 0, 0, 0.6);
          font-size:14px;
          border-radius:4px;
          width: .8rem;
          &.green{
            color: @dark-fawn;
            border: 1px solid @dark-fawn;
          }
        }
      }
    }
    .selecter-wrapper{
      overflow: hidden;
      &:after{
        position: absolute;
        top: 0;
        bottom: -8px;
        right: 4px;
        margin: auto 0;
        width: 20px;
        height: 20px;
        background: url(../assets/img_arrow_down_grey.png) no-repeat #fff;
        background-size: 14px 9px;
        content: '';
      }
    }
    .select{
      -webkit-appearance:none;  
      border-radius:0;
    }
  }
}

</style>
