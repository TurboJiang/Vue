<template>
  <div id="app">
    Clicked{{$store.state.count}} times,count is {{evenOrOdd}}
    <button @click="increment()">+</button>
    <button @click="decrement()">-</button>
    <button @click="incrementIfOdd()">Increment If Odd</button>
    <button @click="incrementAsync()">IncrementAsync</button>
  </div>
</template>

<script>
// 中央至地方管理的api
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  // 不能点击如何使用getters？
  computed: mapGetters(
    ['evenOrOdd']
    ),

  methods: mapActions([
    // 交给actions
    "increment",
    "decrement",
    "incrementIfOdd",
    "incrementAsync"
  ]),
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
