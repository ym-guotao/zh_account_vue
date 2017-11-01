import Vue from 'vue'
import Router from 'vue-router'
import Step1 from '@/views/step1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Step1',
      component: Step1
    }
  ]
})
