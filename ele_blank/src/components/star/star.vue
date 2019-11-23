<template>
  <div class="stars" :class="`star-${size}`">
    <span class="star" v-for="(starType ,index) in starTypeCount" :key="index" :class="starType"></span>
  </div>
</template> <!--html-->

<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'
  export default{
    props: {
      score: Number,
      size: Number
    },
    computed: {
        starTypeCount(){
          const starTypeArr = []
          const {score} = this
          const scoreInt = Math.floor(this.score)
          // n个on
          for(var i=0; i<scoreInt; i++){
            starTypeArr.push(CLASS_ON)
          }
          // 0个或1个half
          if(score*10 - scoreInt*10 >= 5){
            starTypeArr.push(CLASS_HALF)
          }
          // n个off
          while (starTypeArr.length < 5){
            starTypeArr.push(CLASS_OFF)
          }
          return starTypeArr
        }
    }
  }
</script><!--js-->

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .stars
    &.star-48
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

    &.star-36
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

    &.star-24
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

</style><!--css-->
