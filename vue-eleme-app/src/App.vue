<template>
  <div id="app">
    <!-- header组件 -->
    <v-header :seller='seller'></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <!-- a标签 -->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 在路由入口上传递一个名叫seller的seller接口数据  其他页面都是通过本路由入口跑起来的 seller数据就均可以使用-->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
//  组件不需要路由 直接引入
import header from '@/components/header/header.vue'
export default {
  name: 'App',
  data() {
    return {
      seller:{
        // 要从api接口获取
      }
    }
  },
  // 声明组件
  components:{
    'v-header':header
  },
  // 获取seller接口数据
  created() {
    this.$http.get('https://www.easy-mock.com/mock/5d00f540294a6f025a3f9924/vue-eleme-app/vue-eleme-app')
        .then(res=>{
          console.log(res)
          // 是否请求成功
          if(res.data.errno === 0){
            // this.seller = res.data.data
            // 对象拼接
            this.seller = Object.assign({},this.seller,res.data.data)
          }
        })
  },
}
</script>

<style lang="stylus">
@import './common/stylus/mixin.styl'
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  border-1px(rgba(7, 17, 27, 0.1));

  .tab-item {
    flex: 1;
    text-align: center;

    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      text-decoration: none;

      &.router-link-active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
