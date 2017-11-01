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
          <select class="block country-list select">
          </select>
        </div>
        <div class="form-item">
          <input type="number" pattern="[0-9]*"  class="block input" placeholder="请输入手机号" />
        </div>
        <div class="input-wrapper form-item">
          <input 
            type="number" 
            style="width: 65%; display:inline-block"  
            pattern="[0-9]*" 
            class="block input" 
            placeholder="请输入4位验证码"
            v-model.trim="vCode"
          />
          <span>
            <em 
              :class="sendClass"
              :style="{display: sendDisplay}"
            >
              发送验证码
            </em>
          </span>
        </div>
        <button 
          type="submit" 
          class="block step1-submit button"
          :disabled="btnAvailable"
        >
          下一步
        </button>
        <FormFooter step="step1" />
      </form>
    </div>
    <Popup @clearMessage="clearMessage" />
  </div>
</template>

<script>
import TopBanner from '@/components/TopBanner'
import FormHeaderStep1 from '@/components/FormHeaderStep1'
import FormFooter from '@/components/FormFooter'
import Popup from '@/components/Popup'

export default {
  name: 'step1',
  data () {
    return {
      dcc: sessionStorage.getItem('dcc') || '0086',
      mobile: sessionStorage.getItem('mobile') || '',
      code: sessionStorage.getItem('code') || '',
      disableSendCode: false,
      timer: false,
      vCode: '',
      message: ''
    }
  },
  computed: {
    sendClass () {
      return this.disableSendCode ? 'send-v-code' : 'send-v-code green'
    },
    sendDisplay () {
      return this.timer ? 'none' : ''
    },
    btnAvailable () {
      return this.vCode.length !== 4
    },
    template () {
      return this.$route.query.template
    },
    inviter () {
      return this.$route.query.inviter
    }
  },
  methods: {
    clearMessage () {
      this.messgae = ''
    }
  },
  components: {
    TopBanner,
    FormHeaderStep1,
    FormFooter,
    Popup
  },
  updated () {
    console.log(this.template)
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
