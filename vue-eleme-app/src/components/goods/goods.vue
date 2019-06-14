<template>
<div>
    <div class="goods">
    <!-- ref获取到节点 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <!-- :key是每个循环的唯一标识 -->
        <li
          v-for="(item,index) in goods"
          :key="index"
          class="menu-item"
          :class="{'current' : currentIndex === index}"
        >
          <!-- 个别菜单栏上有icon -->
          <span class="text border-1px">
            <!--v-show用于根据条件展示元素 一个属性控制icon是否展示  根据下标绑定类名 -->
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
// node_modules中的 页面滑动效果
import BScroll from 'better-scroll'
export default {
  name: "goods",
  data() {
    return {
      goods: [],
      classMap: []
    };
  },
  created() {
    //   将classMap数据写死  classMap的类名们 根据item.type的值匹配类名
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    // 接口数据请求  axios
    this.$http
      .get(
        "https://www.easy-mock.com/mock/5d023d7efb82272509b46e32/eleme-goods/eleme-goods"
      )
      //   .then——>resolve请求下来的数据  .cache——>reject下来的数据
      .then(res => {
        // console.log(res);
        // 保证请求成功
        if (res.data.errno === 0) {
          this.goods = res.data.data;
        //   当html还未形成 还是模板 页面渲染还未完成
          this.$nextTick(()=>{//保证html渲完成之后才能执行initScroll方法
            this._initScroll()
          })
        }
      });
  },// 使用生命周期来请求接口数据：created & beforeCreate、mounted (部分数据请求在次数据请求完成未完成可能会导致页面数据留白的情况)&  beforeMount
  methods: {
      _initScroll(){
        //   ref获取dom结构:this.$refs.menuWrapper
          this.menuScroll = new BScroll(this.$refs.menuWrapper,{
              click:true
          })
      }
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';
.goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
        flex 0 0 80px
        width 80px
        background #f3f5f7
        .menu-item
            display table
            height 54px
            width 56px
            padding 0 12px
            line-height 14px
            &.current
                position relative
                z-index 10

                margin-top -1px//边框1px
                font-weight 700
                background #ffffff
            .text
                border-none()//外部定义css方法
                .icon
                    display inline-block
                    vertical-align top
                    height 12px
                    width 12px
                    margin-right 2px
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount 
                        bg-image('discount_3')
                    &.guarantee 
                        bg-image('guarantee_3')
                    &.invoice 
                        bg-image('invoice_3')
                    &.special 
                        bg-image('special_3')
            .text
                display table-cell
                width 56px
                vertical-align middle
                border-1px(rgba(7,17,27,0.1))
                font-size 12px
</style>
