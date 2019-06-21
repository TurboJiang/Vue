import Vue from 'vue'
import Vuex from 'vuex'

// this.$store  vue全局实例

// 启用vuex 可拔插
Vue.use(Vuex)
const state = {
    count: 0
}
// 修改 修改要管起来 要严谨
const mutations = {
    // 按我的方式来
    increment(state) {
        state.count++;
    },
    decrement(state) {
        state.count--;
    }
}
// 相当于组件内部的computed属性 负责对状态进行包装
const getters = {
    evenOrOdd : state => state.count % 2 === 0 ? 'even' : 'odd'
}

// 组件只能和 actions 交流 组件不能直接和state修改交流
// key 函数名 value 为函数值
const actions = {
    increment: ({commit}) => commit('increment'),
    decrement: ({commit}) => commit('decrement'),
    incrementIfOdd ({commit,state}) {
        // 将组件逻辑放到actions
        // 是否是奇数 每加1（increment）就进行if检测
        // state.count = 1
        if((state.count + 1) % 2 === 0){
            commit('increment')
        }
    },
    // 异步修改 交给mutations
    incrementAsync ({commit}) {
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                commit('increment')
                resolve()
            },2000)
        })
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})


