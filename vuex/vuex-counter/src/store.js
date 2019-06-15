import Vue from 'vue'
import Vuex from 'vuex'

// 启用vuex  管理全局状态
Vue.use(Vuex)
const  state = {
    count : 0
}

export default new Vuex.Store({
    state
})