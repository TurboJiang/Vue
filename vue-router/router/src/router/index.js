import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Look from '@/components/Look'
import LookOne from '@/components/LookOne'
import LookTwo from '@/components/LookTwo'

Vue.use(Router)

export default new Router({
  // 配置路由
  routes: [
    // 一级路由
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      // url传参 <router-link to="/look/12345">看看</router-link>
      path:'/look/:id',
      name:'Look',//可以不写
      component:Look,
      // 配置子路由
      children:[
        {
          // /look/look-one路径配置详细可以在运行时看清路径，但用法俗不可耐 
          // 以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”
          path:'look-one',//运行时会自动配置路径
          name:'LookOne',
          component:LookOne
        },
        {
          path:'look-two',
          name:'LookTwo',//带参点击跳转页面时 name字段必须存在
          component:LookTwo
        }
      ]
    },
    // 重定向：配置一级路由————>根目录
    {
      path:'/detail',
      redirect:'/'
    }
  ]
})
