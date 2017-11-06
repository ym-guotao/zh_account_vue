import Vue from 'vue'
import Router from 'vue-router'
import Step1 from '@/views/step1'
import Step2 from '@/views/step2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Step1',
      component: Step1
    },
    {
      path: '/step2',
      name: 'step2',
      component: Step2
    }
  ]
})
