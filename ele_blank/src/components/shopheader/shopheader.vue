<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" alt="">
          <div class="back" @click="$router.back()">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
          <div class="supports" v-if="seller.supports">
            <span class="icon" :class="supportClass[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
          <div class="support-count" v-if="seller.supports" @click="toggleShow">
            <span class="count">{{seller.supports.length}}个</span>
            <span class="icon-keyboard_arrow_right"></span>
          </div>
        </div>
      </div>
      <div class="bulletin-wrapper" @click="toggleShow">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
      <div class="bg">
        <img :src="seller.avatar" alt="">
      </div>
      <transition name="fade">
        <div class="mask" v-show="isShow">
          <div class="mask-wrapper">
            <div class="mask-main">
              <h1>{{seller.name}}</h1>
              <div class="stars-wrapper">
                  <star :score="seller.score" :size="48"/>
              </div>
              <div class="info">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="list">
                <li v-for="(support, index) in seller.supports" :key="index">
                  <span class="icon" :class="supportClass[support.type]"></span>
                  <span>{{support.description}}</span>
                </li>
              </ul>
              <div class="info">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="context">
                <p class="text">{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="mask-footer" @click="toggleShow">
            <span class="icon-close"></span>
          </div>
        </div>
      </transition>

    </div>
</template> <!--html-->
<script>
  import {mapState} from 'vuex'
  import star from '../star/star.vue'
    export default{
      data(){
          return {
              isShow: false,
              supportClass: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
          }
      },
      computed: {
        ...mapState(['seller'])
      },
      methods: {
          toggleShow(){
              this.isShow = !this.isShow
          }
      },
      components: {star}
    }
</script><!--js-->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .header
    background-color: rgba(7,17,27,0.5)
    color #fff
    overflow hidden
    position relative
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      overflow hidden // 清除浮动
      .avatar
        float left
        width 64px
        height 64px
        &>img
          width 100%
          height 100%
          border-radius 2px
        .back
          position: absolute
          top: 10px
          left: 0
        .icon-arrow_lift
          display: block
          padding: 5px
          font-size: 20px
          color: #fff
      .content
        float left
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align middle
            width 30px
            height 18px
            background-repeat no-repeat
            background-size 30px 18px
            bg-img(brand)
          .name
            font-size 16px
            font-weight bold
            line-height 18px
            margin-left 6px
        .description
          font-size 12px
          font-weight 200
          line-height 12px
        .supports
          margin 10px 0 2px 0
          .icon
            display inline-block
            vertical-align middle
            width 12px
            height 12px
            background-repeat no-repeat
            background-size 12px 12px
            &.decrease
              bg-img(decrease_1)
            &.discount
              bg-img(discount_1)
            &.guarantee
              bg-img(guarantee_1)
            &.invoice
              bg-img(invoice_1)
            &.special
              bg-img(special_1)

          .text
            font-size 10px
            font-weight 200
            line-height 12px
        .support-count
          position absolute
          right 12px
          bottom 18px
          height 24px
          padding 7px 8px
          border-radius 8px
          background-color: rgba(0,0,0,0.2);
          font-weight 200px
          font-size 10px
          line-height 12px
          box-sizing border-box
          .count
            margin-right 2px

    .bulletin-wrapper
      position relative
      height 28px
      line-height 23px
      padding 0 12px
      background-color: rgba(7,17,27,0.2)
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      .bulletin-title
        display inline-block
        vertical-align middle
        width 22px
        height 12px
        background-repeat no-repeat
        background-size 100% 100%
        bg-img(bulletin)
      .bulletin-text
        margin 0 4px
        font-size 10px
        font-weight 200
      .icon-keyboard_arrow_right
        position absolute
        right 7px
        top 8px

    .bg
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      &>img
        width 100%
        height 100%
        filter blur(10px)

    .mask
      &.fade-enter-active,&.fade-leave-active
        transition opacity 0.5s
      &.fade-enter,&.fade-leave-to  // 隐藏时的样式
        opacity 0
      z-index 100
      position: fixed
      top 0px
      left 0px
      width 100%
      height 100%
      background-color rgba(7,17,27,0.8)
      .mask-wrapper
        min-height 100%
        .mask-main
          padding 64px 36px 32px
          &>h1
            font-size 16px
            font-weight 700
            line-height 16px
            text-align center
            margin-bottom 16px
          .stars-wrapper
            height 24px
            .star-48
              text-align center
              .star
                display inline-block
                vertical-align middle
                width 20px
                height 19px
                margin-right 22px
                background-repeat:no-repeat
                background-size 20px 19px
              .star:last-child
                margin-right 0
              .on
                bg-star(star48_on)
              .half
                bg-star(star48_half)
              .off
                bg-star(star48_off)

            .star-36
              text-align center
              .star
                display inline-block
                vertical-align middle
                width 20px
                height 19px
                margin-right 22px
                background-repeat:no-repeat
                background-size 20px 19px
              .star:last-child
                margin-right 0
              .on
                bg-star(star36_on)
              .half
                bg-star(star36_half)
              .off
                bg-star(star36_off)

            .star-24
              text-align center
              .star
                display inline-block
                vertical-align middle
                width 20px
                height 19px
                margin-right 22px
                background-repeat:no-repeat
                background-size 20px 19px
              .star:last-child
                margin-right 0
              .on
                bg-star(star24_on)
              .half
                bg-star(star24_half)
              .off
                bg-star(star24_off)

          .info
            margin 28px 0 24px 0
            overflow hidden
            .line
              float left
              width 112px
              height 2px
              background-color: rgba(255,255,255,0.2)
              margin-top 6px
            .text
              float left
              margin 0 11px
              font-size 14px
              font-weight 700
              line-height 14px
          .list
            padding 0 12px
            &>li
              height 16px
              margin-bottom 12px
              .icon
                display inline-block
                vertical-align middle
                width 16px
                height 16px
                background-repeat no-repeat
                background-size 100% 100%
              .decrease
                bg-img(decrease_2)
              .discount
                bg-img(discount_2)
              .guarantee
                bg-img(guarantee_2)
              .invoice
                bg-img(invoice_2)
              .special
                bg-img(special_2)

              &>span
                margin-left 6px
                font-size 12px
                line-height 12px
                font-weight 200
          .context
            padding 0 12px
            .text
              font-size 12px
              line-height 24px
              font-weight 200

      .mask-footer
        margin-top -64px
        text-align center
        &>span
          color rgba(255,255,255,0.5)
          font-size 32px

</style><!--css-->
