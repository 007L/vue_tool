import Vue from 'vue'
import vueResource from 'vue-resource'
import vueLazyload from 'vue-lazyload'
// import {Button} from 'mint-ui'

import router from './router'
import App from './App.vue'
import store from './store'
import split from './components/split/split.vue'
import svgImage from './components/svg/svg_image.vue'
import './filters'

import './mock/mockServer'  // 加载这个模块即可
import './common/stylus/fonts.styl'
import loading from './common/imgs/loading.gif'
import 'common/utils/rem'

Vue.use(vueResource)  // 每个组件对象都多了一个属性：$http(发送ajax请求)
Vue.use(vueLazyload, {loading})

// 注册全局组件
Vue.component('split', split)
// Vue.component(Button.name, Button)
Vue.component('svgImage', svgImage)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
