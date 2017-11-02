<template>
  <div class="step1">
    <TopBanner
      :template="this.template"
      :inviter="{
        name: 'test', 
        company: 'company', 
        position: 'position', 
        avatar: '../assets/banner_haike_card.jpg'
      }"
    />
    <div class="container">
      <h4 class="form-header"> 
        <span class="line">&nbsp;</span>
        <FormHeaderStep1
          :template="this.template"
        />
      </h4>
      <form class="register-form">
        <div class="selecter-wrapper form-item">
          <select class="block country-list select" @change="onCountrySelectorChange" v-model="dcc">
            <option 
              v-for="country in countryArr" 
              :key="country.key" 
              :value="country.value"
            >
              {{country.value2}}
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
              :style="{display: sendDisplay}"
              @click="() => beforeSubmit(onSendCode)"
            >
              发送验证码
            </em>
          </span>
        </div>
        <button 
          type="submit" 
          class="block step1-submit button"
          :disabled="btnNotAvailable"
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
import {send} from '@/lib/http'
import store from '@/store'
import getQuery from '@/mixins/getQuery'

export default {
  name: 'step1',

  mixins: [getQuery],

  data () {
    return {
      dcc: sessionStorage.getItem('dcc') || '0086',
      mobile: sessionStorage.getItem('mobile') || '',
      code: sessionStorage.getItem('code') || '',
      disableSendCode: false,
      timer: false,
      vCode: '',
      message: '',
      countryArr: [{key: 'country_207', value: '0086', value2: '中国'}]
    }
  },

  computed: {
    sendClass () {
      return this.disableSendCode ? 'send-v-code' : 'send-v-code green'
    },
    sendDisplay () {
      return this.timer ? 'none' : ''
    },
    btnNotAvailable () {
      return this.code.length !== 4
    }
  },

  methods: {
    _encodeParams (params) {
      return Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      }).join('&')
    },
    clearMessage () {
      console.log('clearMessage')
      this.message = ''
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
    onCountrySelectorChange () {
      console.log(this.dcc)
    },
    onSendCode () {
      const that = this
      send(`${store.baseUrl}/wz/account/mobile/check`, {
        params: {
          dcc: that.dcc,
          mobile: that.mobile
        }
      })
        .then(response => {
          console.log(response)
        })
    }
  },

  components: {
    TopBanner,
    FormHeaderStep1,
    FormFooter,
    Popup
  },

  mounted () {
    send(`${store.baseUrl}/wz/tool/dict/country_code`)
      .then(response => {
        this.countryArr = Object.values(response)
      })
  },

  updated () {
    console.log('mobile: ', this.mobile, 'dcc: ', this.dcc, 'code: ', this.code)
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
