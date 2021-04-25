import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Ball from '@/components/Ball'
import Light from '@/components/Light'
import Text from '@/components/Text'
import Snow from '@/components/Snow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ball',
      name: 'Ball',
      component: Ball
    },
    {
      path: '/light',
      name: 'Light',
      component: Light
    },
    {
      path: '/text',
      name: 'Text',
      component: Text
    },
    {
      path: '/snow',
      name: 'Snow',
      component: Snow
    }
  ]
})
