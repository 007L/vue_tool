<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count"
         @click.stop="updateFoodCount(false)"></div>
    <div class="cart-count"  v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="updateFoodCount(true, $event)"></div>
  </div>
</template> <!--html-->

<script>
    import PubSub from 'pubsub-js'
    export default{
        props: {
            food: Object
        },
      methods: {
        updateFoodCount(isAdd, event){
          const {food} = this
          this.$store.dispatch('updateFoodCount', {food, isAdd})
          //确认开始的元素
          if(isAdd){
            // 发布startEl
            PubSub.publish('startEl', event.target)
          }
        }
      }

    }
</script><!--js-->

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-active
        opacity 0
        transform translateX(20px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

</style><!--css-->
