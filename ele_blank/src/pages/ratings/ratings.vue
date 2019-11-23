<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>

              <star class="star" :score="seller.serviceScore" :size="36" />

              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>

              <star class="star" :score="seller.foodScore" :size="36" />

              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>

        </div>

      <split />

      <ratingSelect :descs="['全部', '满意', '不满意']"
                    :ratings="ratings"
                    :selectType="selectType"
                    :onlyContent="onlyContent"
                    @toggleOnlyContent="toggleOnlyContent"
                    @setSelectType="setSelectType"/>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star class="star" :score="rating.score" :size="24"/>
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span :class="rating.rateType===0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | dateString('HH:mm:ss')}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template> <!--html-->

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import star from '../../components/star/star.vue'
  import ratingSelect from '../../components/ratingSelect/ratingSelect.vue'
  import {ratingsMixin} from '../../util/mixins'
  export default{
    mixins: [ratingsMixin],
    mounted(){
        this.$store.dispatch('requestRatings', ()=>{
            this.$nextTick(()=>{
              this.scroll = new BScroll(this.$refs.ratings, {click: true})
            })
        })

    },
    computed: {
      ...mapState(['ratings', 'seller']),
      /*filterRatings(){
        /!*1. 相关数据
         food.ratings
         selectType: // 0推荐,1吐槽,2全部
         onlyContent: true/false
         2. 逻辑
         1.类型： selectType===2 || selectType=rating.rateType
         2.内容： onlyContent -- rating.text.length
         !onlyContent || rating.text.length>0
         *!/

        const {ratings} = this
        if(!ratings){ // 还没有数据，返回[]
          return []
        }
        const {selectType, onlyContent} = this
        return ratings.filter(rating => {
          return (selectType===2 || selectType===rating.rateType) && (!onlyContent || rating.text.length>0)
        })
      }*/
    },
  /*  methods: {
      // 子组件调用方法
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
      }
    },*/
    components: {
      star,
      ratingSelect
    }
  }
</script><!--js-->

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 192px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .stars
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .star
            background-size 80%
            margin 0px 0 0 5px
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .stars
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .star
              background-size 70%
              margin 0 0 0 -2px
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
