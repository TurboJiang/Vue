<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>导航：
      <!-- router-link相当于a标签 使用router-link进行路由(页面)跳转 -->
      <router-link to="/">首页</router-link> |
      <router-link to="/look/12345">看看</router-link>

      <!-- <router-link to="/look/look-one">look1</router-link> -->
      <!-- 点击事件go -->
      <div class="test" @click="go">look1</div>

      <!-- <router-link to="/look/look-two">look2</router-link> -->
      <!-- 带参跳转页面 要传参时必须要有Name字段(通过name匹配) -->
      <router-link :to="{name:'LookTwo',params:{id:123}}">look2</router-link>

      <!-- 路由重定向 点击去detail页面 -->
      <router-link to="/detail">重定向</router-link>
    </p>
    <!-- 控制所有的一级路由，不管二级路由， -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    go () {
      this.$router.push({name:'LookOne' ,params:{name:'jyf'}})//编程式路由跳转
    }
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
