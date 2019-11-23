<template>
  <transition name="move">
    <div class="food" v-show="isShow" ref="food">
      <div class="food-content">
        <div class="image-header">

          <!--todo 懒加载图片-->
          <img v-lazy="food.image">
          <div class="back" @click="toggleShow">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>

          <div class="cartcontrol-wrapper">
            <cartControl :food="food"/>
          </div>
        </div>

        <split />

        <div class="info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>

        <split />

        <div class="rating">
          <h1 class="title">商品评价</h1>

          <ratingSelect :descs="['全部', '推荐', '吐槽']"
                        :ratings="food.ratings"
                        :selectType="selectType"
                        :onlyContent="onlyContent"
                        @toggleOnlyContent="toggleOnlyContent"
                        @setSelectType="setSelectType"/>

          <div class="rating-wrapper">
            <ul>
              <li class="rating-item border-1px"
                  v-for="(rating, index) in filterRatings" :key="index">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img width="12" height="12" class="avatar" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | dateString}}</div>
                <p class="text">
                  <span :class="rating.rateType===0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="food.ratings && food.ratings.length===0">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template> <!--html-->

<script>
  import BScroll from 'better-scroll'
  import cartControl from '../cartControl/cartControl.vue'
  import ratingSelect from '../ratingSelect/ratingSelect.vue'
  import {ratingsMixin} from '../../util/mixins'
  export default{
    mixins: [ratingsMixin],
    props: {
      food: Object
    },
    data(){
      return {
        isShow: false
//        selectType: 2, // 0推荐,1吐槽,2全部
//        onlyContent: true
      }
    },
    methods: {
      toggleShow(){
        this.isShow = !this.isShow

        if(this.isShow){
            this.$nextTick(()=>{
                if(!this.scroll){
                   this.scroll = new BScroll(this.$refs.food, {click: true})
                }else {
                    this.scroll.refresh()
                }
            })
        }
      }

      /*// 子组件调用方法
      toggleOnlyContent(){
        this.onlyContent = !this.onlyContent
        // 刷新scroll -- 评论列表高度不够，拖动显示不了完整评论
        this.$nextTick(()=>{
            this.scroll.refresh()
        })
      },
      setSelectType(selectType){
        this.selectType = selectType
        // 刷新scroll -- 评论列表高度不够，拖动显示不了完整评论
        this.$nextTick(()=>{
          this.scroll.refresh()
        })
      }*/

    },
/*    computed: {
      filterRatings(){
        /!*1. 相关数据
            food.ratings
            selectType: // 0推荐,1吐槽,2全部
            onlyContent: true/false
          2. 逻辑
             1.类型： selectType===2 || selectType=rating.rateType
             2.内容： onlyContent -- rating.text.length
                    !onlyContent || rating.text.length>0
        *!/

        const {ratings} = this.food
        if(!ratings){ // 还没有数据，返回[]
            return []
        }
        const {selectType, onlyContent} = this
        return ratings.filter(rating => {
            return (selectType===2 || selectType===rating.rateType) && (!onlyContent || rating.text.length>0)
        })
      }
    },*/
    components: {
      cartControl,
      ratingSelect
    }
  }
</script><!--js-->

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all .2s linear
    &.move-enter, &.move-leave-active
      opacity 0
      transform: translate3d(100%, 0, 0)

    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff

    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
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
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        &.fade-transition
          transition: all 0.2s
          opacity: 1
        &.fade-enter, &.fade-leave
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
