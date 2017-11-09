<template>
  <div class="step2">
    <div :class="template">
      <TopBanner
        :template="template"
        :inviter="inviter"
        :hasnotDefault="true"
      />
    </div>
    <div class="container">
      <h4 class="form-header"> 
        <span class="line">&nbsp;</span>
        <FormHeaderStep2
          :template="template"
        />
      </h4>
      <form class="register-form">
        <div class="form-item-inline">
          <label>姓名</label>
          <div class="field-wrapper">
            <input 
              maxLength="20" 
              type="text" 
              class="block" 
              placeholder="输入真实姓名"
              v-model.trim="uname"
            />
          </div>
        </div>

        <div class="form-item-inline">
          <label style="top: 0">称呼</label>
          <div class="field-wrapper">
            <div class="radio-box radio">
              <div class="radio">
                <input 
                  id="male" 
                  type="radio" 
                  value="male"
                  v-model="gender"
                  :checked="gender === 'male'"
                />
                <label for="male" class="radio-label">先生</label>
              </div>
            </div>
            <div class="radio-box radio">
              <div class="radio">
                <input 
                  id="female" 
                  type="radio"
                  value="female"
                  v-model="gender"
                  :checked="gender === 'female'"
                />
                <label for="female" class="radio-label">女士</label>
              </div>
            </div>
          </div>
        </div>
        <div class="form-item-inline">
          <label>公司</label>
          <div class="field-wrapper">
            <input 
              maxLength="40" 
              type="text" 
              class="block" 
              placeholder="输入公司名称或机构名称"
              v-model.trim="com_name"
            />
          </div>
        </div>
        <div class="form-item-inline">
          <label>职务</label>
          <div class="field-wrapper">
            <input 
              maxLength="20" 
              type="text" 
              class="block" 
              placeholder="输入职务" 
              v-model.trim="position"
            />
          </div>
        </div>
        <div>
          <button 
            style="margin-top: 10px"
            class="button step2-submit block"
            type="submit" 
            :disabled="!btnAvailable"
            @click="(event) => onSubmit(event)"
          >
            立即注册
          </button>
        </div>
        <FormFooter />
      </form>
    </div>
    <Popup 
      @clearMessage="() => {this.message = ''}"
      :message="message"
    />
  </div>

</template>

<script>
import getQuery from '@/mixins/getQuery'
import encodeParams from '@/mixins/encodeParams'
import wechat from '@/mixins/wechat'
// import {send} from '@/lib/http'
import http from '@/lib/http'
import store from '@/store'
import TopBanner from '@/components/TopBanner'
import FormFooter from '@/components/FormFooter'
import FormHeaderStep2 from '@/components/FormHeaderStep2'
import Popup from '@/components/Popup'

export default {
  name: 'step2',

  mixins: [getQuery, encodeParams, wechat],

  data () {
    return {
      uname: '',
      gender: 'male',
      com_name: '',
      position: '',
      message: ''
    }
  },

  components: {
    TopBanner,
    FormFooter,
    FormHeaderStep2,
    Popup
  },

  methods: {
    onSubmit (event) {
      event.preventDefault()
      http.lock()({
        url: `${store.baseUrl}/wz/account/save/baseinfo`,
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.encodeParams({
          dcc: sessionStorage.getItem('dcc'),
          mobile: sessionStorage.getItem('mobile'),
          uname: this.uname,
          gender: this.gender,
          com_name: this.com_name,
          position: this.position,
          inviter: this.inviterId,
          source: this.source
        })
      })
        .then(response => {
          switch (response.data.code) {
            case 0:
              // 如果有 redir 直接跳转
              if (this.redir) {
                let tmp = decodeURIComponent(this.redir)
                tmp = /\?/.test(tmp) ? tmp + '&' : tmp + '?'
                window.location.href = tmp + response.data.data
                return
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
              break
            default:
              this.message = response.data.msg
          }
        })
    }
  },

  computed: {
    btnAvailable () {
      return this.uname && this.gender && this.com_name && this.position && sessionStorage.getItem('dcc') && sessionStorage.getItem('mobile')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/fn";
.block{
  width: 100%;
}
.step2{
  font-size: .15rem;
  .container{
    padding: .1rem .24rem;
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
    .button{
      height: 44px;
      background: @dark-fawn;
      border: 0;
      border-radius:4px;
      color:#fff;
      font-size:.17rem;
    }
    .step2-submit[disabled]{
      opacity: .3;
    }
    .register-form input,
    .register-form select{
      border-width: 0 0 1px 0;
      height: 32px;
      font-size: 15px;
      border-bottom-color: #EDEDED;
      background-color: transparent;
      border-radius: 0;
      padding:0;
    }
    .form-item-inline,
    .form-item{
      margin-bottom:30px;
    }
    .form-item-inline:after{
      content: '';
      height:0;
      display: block;
      clear:both;
    }

    .form-item-inline > .field-wrapper{
      float: left;
      width: 86%;
      margin-left:2%;
    }
    .form-item-inline > label{
      float: left;
      width:12%;
      position: relative;
      font-size: 15px;
      top:8px;
    }
    .radio-box {
      width:45%;
      display: inline-block;
    }
    .radio {
      input[type="radio"] {
        position: absolute;
        opacity: 0;
        + .radio-label {
          &:before {
            content: '';
            border-radius: 100%;
            border: 1px solid #D8D8D8;
            display: inline-block;
            width: 1em;
            height: 1em;
            position: relative;
            margin-right: .8em; 
            vertical-align: top;
            cursor: pointer;
            text-align: center;
            transition: all 250ms ease;
            font-size:15px;
          }
        }
        &:checked {
          + .radio-label {
            &:before {
              border: 1px solid #CEAC7E;
              background-color: #CEAC7E;
              box-shadow: inset 0 0 0 3px #fff;
            }
          }
        }
        &:focus {
          + .radio-label {
            &:before {
              outline: none;
              border-color: #CEAC7E;
            }
          }
        }
        &:disabled {
          + .radio-label {
            &:before {
              box-shadow: inset 0 0 0 4px #f4f4f4;
              border-color: darken(#f4f4f4, 25%);
              background: darken(#f4f4f4, 25%);
            }
          }
        }
        + .radio-label {
          &:empty {
            &:before {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}

</style>