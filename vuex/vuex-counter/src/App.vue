<template>
  <div>
    <counter :count="count"
              v-on:increment="incrementCount()" />
              
    <!-- <counter-brother :count="count"  /> -->
    <counter-brother />

  </div>
</template>

<script>
// 两个组件都要用到count 怎么办？ 多个兄弟组件需要共享一个属性 将属性放在父组件管理
import Counter from './components/Counter'
import CounterBrother from './components/CounterBrother'

export default {
  name: 'App',
  // data() {
  //   return {
  //     count:0
  //   }
  // },
  components: {
    'counter':Counter,
    'counter-brother':CounterBrother
  },
  // 启用vuex之后 只有store才能改变数据状态 methods不能管理
  methods: {
    // incrementCount() {
    //   this.count++;
    // }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
