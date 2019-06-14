// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// 统一引入stylus文件
import './common/stylus/index.styl'

Vue.config.productionTip = false
// 将axois挂在到vue的原型链上 能直接使用this.$http(相当于使用axios请求数据)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
