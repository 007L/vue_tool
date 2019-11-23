<template>
    <div>
      <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <!--current-->
            <li class="menu-item" v-for="(good, index) in goods" :key="index"
                :class="{current: currentIndex===index}" @click="clickMenu(index)">
              <span class="text border-1px">
                <span class="icon" v-if="good.type>=0" :class="supportClasses[good.type]"></span>{{good.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul>
            <li class="food-list food-list-hook" v-for="(good, index) in goods" :key="index">
              <h1 class="title">{{good.name}}</h1>
              <ul>
                <li class="food-item border-1px" v-for="(food, index) in good.foods"
                    :key="index" @click="showFood(food)">
                  <div class="icon">
                    <img width="57" height="57" :src="food.icon">
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
                      <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartControl :food="food"/>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <shopCart :foods="cartFoods"/>
      </div>
      <food :food="food" ref="food"/>
    </div>
</template> <!--html-->

<script>
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'
    import cartControl from '../../components/cartControl/cartControl.vue'
    import shopCart from '../../components/shopCart/shopCart.vue'
    import food from '../../components/food/food.vue'
    export default{
        components: {cartControl, shopCart, food},
        data () {
          return {
            supportClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
            scrollY: 0,
            tops: [],
            food: {}
          }
        },
        mounted(){
          this.$store.dispatch('requestGoods', ()=>{
              /* // 模拟异步执行
              setTimeout(()=>{
                this._initScroll()
              })*/
              // 回调函数延迟到下次dom更新循环之后执行
            // 新版本不用写this.$nextTick(()=>{})
            this.$nextTick(() => { // 回调函数在界面更新之后立即执行
              this._initScroll()
              this._initTops()
            })
          })
        },

        methods:{
          _initScroll(){
            // 控制左侧列表的scroll
            new BScroll(this.$refs.menuWrapper,{
              click: true  // 分发点击事件
            })

            // 控制右侧列表的scroll
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{//选项配置
  //              startY: 100,
              probeType: 2,
              click: true
              //会在滑动(手指触摸)过程中实时派发scroll事件 -- 默认为0，不触发scroll
            })
            //监视右侧滚动的坐标
            this.foodsScroll.on('scroll', (event)=>{
              // 获取滚动的坐标scrollY  -   event.y
              this.scrollY = Math.abs(event.y)
            })
            // 监视右侧列表滚动的结束
            this.foodsScroll.on('scrollEnd', (event)=>{
              console.log('scrollEnd', event.y)
              this.scrollY = Math.abs(event.y)
            })
          },
          _initTops(){
            //找到所有li
            const lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
            // 统计tops
            const tops = []
            let top = 0
            //第一个分类的top为0
            tops.push(top)
            Array.prototype.slice.call(lis).forEach(li =>{
              top += li.clientHeight
              tops.push(top)
            })
            // 更新状态
            this.tops = tops
            console.log(tops)
          },
          clickMenu(index){
            // 点击左侧分类菜单，右侧列表滚动到指定位置
            //todo 滚动的状态由 better-scroll对象控制

            // 立即更新scrollY, 立即让currentIndex重新计算
            this.scrollY = this.tops[index]
  //            this.foodsScroll.scrollTo(x,y)  -- 滚动到指定位置（添加过渡的效果）
            this.foodsScroll.scrollTo(0, -this.tops[index], 300)
          },
          showFood(food){
            this.food = food
            //显示food组件,父组件执行子组件的方法
            this.$refs.food.toggleShow()
          }
        },

        computed: {
          ...mapState(['goods']),
          /*
           1. 分析出相关的数据
           scrollY: 右侧滑动的y坐标
           tops: 所有右侧分类li标签的top所组成数组
           2. 分析计算逻辑
           tops = [0, 10, 15, 18, 15]
           scrollY =      14, 17, 20
           currentIndex = 1, 2, 3
           scrollY>=top && scrollY<nextTop
           todo 计算属性什么就会执行?: 相关的数据发生了变化
           */
          currentIndex(){
            const {tops, scrollY} = this
            return tops.findIndex((top, index)=>{
              return scrollY>=top && scrollY<tops[index+1]
//                return true  // 代表遍历，返回的 index=0
            })
          },
          cartFoods(){
              const foods = []
              this.goods.forEach(good =>{
                  good.foods.forEach(food =>{
                      if(food.count>0){
                          foods.push(food)
                      }
                  })
              })

              return foods
          }
        }

    }
</script><!--js-->

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 191px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px

</style><!--css-->
