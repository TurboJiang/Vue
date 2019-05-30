import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Main from '@/components/Main'

Vue.use(Router)

// 配置路由
export default new Router({
  routes: [
    // 配置login路由
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // 配置main路由
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
})
