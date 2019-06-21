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
            @click="selectMenu(index,$event)"
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
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <!-- 循环item下的foods数组 使用嵌套列表 -->
              <li v-for="(food,index) in item.foods" :key="index" 
                  class="food-item border-1px" 
                  @click="selectFood(index,$event)"
              ><!-- 事件参数 -->
                  <div class="icon">
                    <img :src="food.icon" alt="" width="57" height="57">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                      <span class="old" v-show="food.oldPrice" >￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol :food="food" @add="addFood()"></cartcontrol>
                    </div>
                  </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart 
        ref="shopcart"
        :selectFoods = "selectFoods"
        :deliveryPrice = "seller.deliveryPrice"
        :minPrice ="seller.minPrice"

      >
      </shopcart>
  </div>
</div>
</template>

<script>
// node_modules中的 页面滑动效果
import BScroll from 'better-scroll'
// 引入组件
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import shopcart from '@/components/shopcart/shopcart'
export default {
  name: "goods",
  data() {
    return {
      goods: [],
      classMap: [],
      // 装页面高度
      listHeight: [],
      scrollY: 0

    };
  },
  props:{
    // 从路由入口接收到的seller数据
    seller:{
      type:Object
    }
  },
  components:{
    cartcontrol,
    shopcart
  },
  computed: {
    currentIndex(){
      for(let i = 0;i<this.listHeight.length;i++){
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i+1]
        if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
          return i
        }
      }
      return 0;
    },
    selectFoods () {
      let  foods = []
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods;
    }
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
          this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
              click:true,
              probeType:3
          })
          this.foodsScroll.on('scroll',pos=>{
            // console.log(pos)
            // 四舍五入
            // abs计算精度
            this.scrollY = Math.abs(Math.round(pos.y))
            console.log(this.scrollY)
            // 0.1 + 0.2 =0.30000000000000004  js会丢失精度  
          })
      },
      selectMenu(index, event) {
        // vue点击参数一定有constructed，当前使用的不是vue绑定的方法，返回判断是不是200.conso.log(event)
        console.log(index, event)
        if (!event._constructed) {
          return;
        }
        // 获取右边页面的li ref=foodlist
        let foodList = this.$refs.foodList;
        // 
        let el = foodList[index];
        // 一个方法 第一个参数 第二个参数300毫秒
        this.foodsScroll.scrollToElement(el, 300);
      },
      _calculateHeight(){
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          // 赋值九个li
          let item = foodList[i]
          // 获取某个dom高度
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      addFood(target){
        this._drop(target)
      },
      _drop(target){
        // 保证在dom结构渲染完成后才会触发的操作
        this.$nextTick(()=>{

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
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc,.extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px

</style>
