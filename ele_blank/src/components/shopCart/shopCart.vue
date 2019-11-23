<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: foods.length}">
              <i class="icon-shopping_cart" :class="{highlight: foods.length}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>

      <div class="ball-container">
        <transition v-for="(ball, index) in balls"
                    :key="index"
                    @before-enter="beforeDrop"
                    @enter="drop"
                    @after-enter="afterDrop">
                    <!--:css="false">-->
          <div class="ball" v-show="ball.isShow">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>

      <div class="shopcart-list"  v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
          <!--<mt-button  type="primary" style="float: right" @click.native="clearCart">清空</mt-button>-->
        </div>
        <div class="list-content" ref="foods">
          <ul>
            <li class="food" v-for="(food, index) in foods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartControl :food="food" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fold">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template> <!--html-->

<script>
//  import {MessageBox, Toast} from 'mint-ui'
  import PubSub from 'pubsub-js'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import cartControl from '../cartControl/cartControl.vue'
  export default{
    props: {
      foods: Array
    },
    data(){
      return {
          isShow: false,
          balls: [
            {isShow: false},
            {isShow: false},
            {isShow: false},
            {isShow: false},
            {isShow: false},
            {isShow: false}
          ],
          dropingBall: []
      }
    },
    mounted(){
       // 开始就订阅startEl
      PubSub.subscribe('startEl', (msg, startEl)=>{
          this.showBoll(startEl)
      })
    },
    methods:{
      showBoll(startEl){
        // 找到隐藏的小球
        const ball = this.balls.find(ball => !ball.isShow)
        // 显示小球
        if(ball){
            ball.isShow = true
            ball.startEl = startEl
            this.dropingBall.push(ball)
        }
      },
      //确定开始位置
      beforeDrop(el){
        // 查找到对应的ball,确定位置
        const ball = this.dropingBall.shift()
        const startEl = ball.startEl

        let offsetX = 0
        let offsetY = 0
        const elLeft = 32
        const elBottom = 22

        const {left, top} = startEl.getBoundingClientRect()

        offsetX = left - elLeft
        offsetY = -(window.innerHeight - elBottom - top)

        el.style.transform = `translateY(${offsetY}px)`
        el.children[0].style.transform = `translateX(${offsetX}px)`

        el.ball = ball
      },
      //回到原始位置
      drop(el){

          const temp = el.clientHeight

          this.$nextTick(()=>{
            el.style.transform = 'translateX(0)'
            el.children[0].style.transform = 'translateY(0)'
          })

      },
      //隐藏小球
      afterDrop(el){

        el.style.display = 'none'
        el.ball.isShow = false
        /*setTimeout(()=>{
          el.ball.isShow = false
        }, 400)*/

      },
       toggleShow(){
           if(this.totalCount){
             this.isShow = !this.isShow
           }
       },

      clearCart(){
           // vuex处理数据
        this.$store.dispatch('clearCart', this.foods)

      }
    },
    computed: {
      ...mapState(['seller']),
      totalCount(){
          // 累加点的food数量
        return this.foods.reduce((preTotal, food)=> preTotal + food.count, 0)
      },
      totalPrice(){
        return this.foods.reduce((preTotal, food)=> preTotal + food.count*food.price, 0)
      },
      payText(){
        const {totalPrice} = this
        const {minPrice} = this.seller
        if(totalPrice === 0){
          return  `￥${minPrice}元起送`
        }else if(totalPrice < minPrice){
          return  `还差￥${minPrice - totalPrice}元起送`
        }else {
          return  '去结算'
        }
      },
      // not-enough,enough
      payClass(){
        return this.totalPrice > this.seller.minPrice ? 'enough' : 'not-enough'
      },

      listShow(){
        let {isShow, totalCount} = this
        if(totalCount === 0){
          this.isShow = false
          return false
        }

        if(isShow){
            this.$nextTick(()=>{
                // 单例
              if(!this.scroll){
                 this.scroll = new BScroll(this.$refs.foods, {click: true})
              }else {
                  // 刷新滚动
                this.scroll.refresh()
              }
            })
        }
        return isShow
      }
    },
    components: {
      cartControl
    }
  }
</script><!--js-->

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.fold-transition
        transition: all 0.5s
        transform: translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-transition
      transition: all 0.5s
    &.fade-enter, &.fade-leave
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
