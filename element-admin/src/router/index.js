import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入login 更改webpack.config.js alias 配置短路径 直接写配置名 不用写完整路径
//  { login }  pages/默认配齐pages下的index.js 在index.js下引入login即可
import { login } from 'pages/'

const routes = [
    {
        path:'/',
        name:'登录',
        component:login
    }
]
export default new Router({
    routes
})