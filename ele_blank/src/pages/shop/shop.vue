<template>
    <div>
      <shopHeader />
      <div class="tab">
        <div class="tab_item">
          <router-link to="/shop/goods" replace>商品</router-link>
        </div>
        <div class="tab_item">
          <router-link to="/shop/ratings" replace>评价</router-link>
        </div>
        <div class="tab_item">
          <router-link to="/shop/seller" replace>商家</router-link>
        </div>
      </div>

      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
</template> <!--html-->

<script>
    import axios from 'axios'
    import shopHeader from '../../components/shopheader/shopheader.vue'
    export default{
      components: {shopHeader},
      mounted(){
        /*//express提供的接口、vue-resource发送ajax请求
        this.$http.get('/api/seller')
          .then(response =>{
              const data = response.data //response.body
              console.log('vue-resource', data);
          }, response => {
              console.log(response.statusText);
          })
        //mockjs提供的接口、axios发送ajax请求
        axios.get('/api1/seller')
          .then(response =>{
            const data = response.data
            console.log('axios', data);
          })
          .catch(error => {
              console.log(error);
          })
*/
        //通知actions发送seller的ajax请求
        this.$store.dispatch('requestSeller')
      }
    }
</script><!--js-->

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    border-1px(rgba(7,17,27,0.1))
    .tab_item
      float left
      width 33.33333333%
      text-align center
      font-size 14px
      color rgb(77,85,93)
      a
        display block
        &.router-link-active
          color rgb(240,20,20)
</style><!--css-->
