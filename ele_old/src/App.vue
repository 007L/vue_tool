<template>
  <div>
    <ele-header></ele-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <!--生成路由链接的a标签-->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!--用来标识显示当前路由组件的标签-->
    <!--属性会传递给所有管理的路由组件-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from 'components/header/header.vue'
  export default {
    mounted () {
      this.$store.dispatch('getSeller')
    },



    components: {
      'ele-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display: flex
    height 40px
    line-height 40px
    text-align center
    font-size 14px
    border-1px(rgba(7,17,27,.1))
    .tab-item
      width 0
      flex 1
      & > a
        display block
        text-decoration none
        color rgb(77,85,93)
        &.active
          color: rgb(240,20,20)
</style>
