<template>
  <div class='foot_guide'>
    <div class="guide_item" @click.stop="refreshIndex()">
      <!--todo 底部外卖svg 点击切换，svg图片切换，显示不同的效果-->
      <span v-if="$route.path.indexOf('msite') !== -1">
        <svgImage className="icon_style" type="#icon-waimai2"/>
      </span>
      <span v-else>
        <svgImage className="icon_style" type="#icon-waimai1"/>
      </span>
      <span>外卖</span>
    </div>
    <div class="guide_item" @click.stop="gotoAddress({path: '/search/' + geohash})">
      <span v-if="$route.path.indexOf('search') !== -1">
        <svgImage className="icon_style" type="#icon-search2"/>
      </span>
      <span v-else>
        <svgImage className="icon_style" type="#icon-search1"/>
      </span>
      <span>搜索</span>
    </div>
    <div class="guide_item" @click.stop="gotoAddress('/order')">
      <span v-if="$route.path.indexOf('order') !== -1">
        <svgImage className="icon_style" type="#icon-dingdan2"/>
      </span>
      <span v-else>
        <svgImage className="icon_style" type="#icon-dingdan1"/>
      </span>
      <span>订单</span>
    </div>
    <div class="guide_item" @click.stop="gotoAddress('/profile')">
      <span v-if="$route.path.indexOf('profile') !== -1">
        <svgImage className="icon_style" type="#icon-geren2"/>
      </span>
      <span v-else>
        <svgImage className="icon_style" type="#icon-geren1"/>
      </span>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState([
        'geohash'
      ]),
    },
    methods: {
      refreshIndex() {
        console.log(this.$route)
        if (this.$route.path === '/msite') {
          //重复点击当前路由，刷新当前路由
          window.location = '/'
        } else {
          //不是当前路由，切换到指定的路由
          this.$router.replace('/msite')
        }
      },
      gotoAddress(path) {
        this.$router.replace(path)
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../common/style/mixin';

  .foot_guide {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    @include wh(100%, 1.95rem);
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0, 0, 0, .1);
    .guide_item {
      flex: 1;
      display: flex;
      text-align: center;
      flex-direction: column;
      align-items: center;
      span {
        @include sc(.50rem, #666);
        .icon_style {
          @include wh(0.9rem, .9rem);
          margin-bottom: .1rem;
          margin-top: .1rem;
          fill: #ccc;
        }
      }
    }
  }
</style>
