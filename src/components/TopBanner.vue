<template>
  <div>
    <!-- case 1: 邀请人 -->
    <div class="top-inviter" v-if="template === 'inviter_id_auth'">
      <div class="top-inviter__avarar"><img :src="inviter.avatar" alt="banner" /></div>
      <h2 class="top-inviter__uname">{{inviter.uname}}</h2>
      <p class="top-inviter__paragraph">{{inviter.company}}</p>
      <p class="top-inviter__paragraph">{{inviter.position}}</p>
    </div>
    <!-- case 2: 找人 minimal available product -->
    <div class="top-banner" v-if="template === 'resource'">
      <img src="../assets/banner_resource.png" alt="banner" />
    </div>
    <!-- case 3: 找人一期第一人称 -->
    <div class="top-banner" v-if="template === 'reward'">
      <img src="../assets/banner_reward.png" alt="banner" />
    </div>
    <!-- case 4: 找人一期第二人称 -->
    <div class="top-banner" v-if="template === 'favor'">
      <img src="../assets/banner_reward.png" alt="banner" />
    </div>
    <!-- case 5: 海客卡 -->
    <div class="top-haike" v-if="template === 'haike_card'">
      <div class="top-haike__uname" v-if="inviter.name">
        <strong>{{inviter.name}}</strong> • 赠送
      </div> 
    </div>
    <!-- case 6: 默认情况 hasnotDefault = fasle -->
    <div className="top-banner" v-if="!hasnotDefault && !template">
      <img src="../assets/banner_top.png" alt="banner" />
    </div>
    <!-- case 7: 没有任何输出 hasnotDefault = true -->
  </div>
</template>

<script>
// 根据template参数来决定显示相应的模板
export default {
  name: 'topBanner',
  props: {
    template: String,
    inviter: {
      type: Object,
      default: {}
    },
    hasnotDefault: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
@import "../style/fn";

.top-inviter{
  background: url(../assets/banner_inviter.png) no-repeat top left/100% auto;
  text-align: center;
  border-bottom:10px solid #f2f2f2;
  padding-top:40%;
  padding-bottom: 10px;
  font-size: .15rem;
  .top-inviter__uname{
    font-weight:normal;
    color: @black-54;
    margin: 10px auto;
  }
  .top-inviter__paragraph{
    color: rgba(0, 0, 0, 0.54);
    margin: 0 0 10px;
  }
  .top-banner{
    
  }
  .top-inviter__avarar{
    width:64px;
    height:64px;
    border:3px solid #fff;
    border-radius:50px;
    margin: 0 auto;
    overflow: hidden;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.06);
  }
}

.top-haike{
  background: url(../assets/banner_haike_card.jpg) no-repeat top left/100% auto;
  padding: 9% 0 70%;
  text-align: center;
  font-size: .16rem;
  .top-haike__uname{
    color: rgba(255, 255, 255, 0.98);
    vertical-align: middle;
    strong{
      font-size: .2rem;
    }
  }
}
</style>
