import Vue from 'vue';//用来mvvm
import App from './App.vue'//根组件
import store from './store'//统一管理应用状态

// SPA
new Vue({
  el: '#app',
  store,//只允许一个，管理状态
  render: h => h(App)
})